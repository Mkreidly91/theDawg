const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  NoSubscriberBehavior,
  getVoiceConnection,
} = require("@discordjs/voice");

const play = require("play-dl");

const joinVoice = ({ message, audioManager }) => {
  const {
    member: {
      voice: { channel: voiceChannel },
    },
    channel,
  } = message;
  const {
    id: channelId,
    guild: { id: guildId, voiceAdapterCreator },
  } = voiceChannel;

  try {
    if (audioManager.voiceChannel) return audioManager;

    audioManager.textChannel = channel;
    audioManager.voiceChannel = voiceChannel;

    const prevConnection = getVoiceConnection(guildId);
    if (prevConnection) {
      audioManager.connection = prevConnection;
    } else {
      const newConnection = joinVoiceChannel({
        channelId: channelId,
        guildId: guildId,
        adapterCreator: voiceAdapterCreator,
        selfDeaf: false,
      });

      audioManager.connection = newConnection;
    }

    //new audioPlayer
    if (!audioManager.audioPlayer) {
      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });

      //set the audio player in audioManager and subcribe the connection
      audioManager.audioPlayer = audioPlayer;
      const subscription = audioManager.connection.subscribe(
        audioManager.audioPlayer
      );

      //disconnect after 5 seconds of idle
      audioManager.audioPlayer.once(AudioPlayerStatus.Idle, () => {
        if (audioManager.queue.length === 0) {
          setTimeout(() => {
            destroyConnection(audioManager);
          }, 5000);
        }
      });
    }

    return audioManager;
  } catch (error) {
    console.log(error);
  }
};

//Implementing Search
const searchSong = async (args) => {
  const validate = await play.yt_validate(args);
  if (validate === "search") {
    const searched = await play.search(args, {
      source: { youtube: "video" },
    });
    const info = await play.video_info(searched[0].url);
    return { info, type: "search" };
  } else if (validate === "video") {
    const info = await play.video_info(args);
    return { info, type: "video" };
  } else if (validate === "playlist") {
    const playlistInfo = await play.playlist_info(args);
    const videos = await Promise.allSettled(
      playlistInfo.videos.map(async (video) => {
        const videoInfo = await play.video_info(video.url);
        return videoInfo;
      })
    );
    const info = [playlistInfo, videos];
    return { info, type: "playlist" };
  }
};

const addToQ = async ({ args, audioManager }) => {
  let { queue } = audioManager;

  try {
    const { info, type } = await searchSong(args);
    if (type === "playlist") {
      const [playlistInfo, videos] = info;
      const { title, channel } = playlistInfo;
      videos.forEach((promise) => {
        if (promise.status === "rejected") return;
        const { title, channel, url, durationInSec } =
          promise.value.video_details;
        queue.push({
          title,
          by: channel.name,
          url,
          relatedVideos: promise.value.related_videos,
          duration: durationInSec,
        });
      });
      return `Playlist: "${title}" by ${channel.name} was added to queue`;
    } else {
      const { title, channel, url, durationInSec } = info.video_details;

      queue.push({
        title,
        by: channel.name,
        url,
        relatedVideos: info.related_videos,
        duration: durationInSec,
      });
      return `${title} by ${channel.name} was added to queue`;
    }
  } catch (error) {
    console.log(error);
  }
};

const playSong = async ({ seek = 0, audioManager }) => {
  const { queue, audioPlayer, textChannel } = audioManager;

  if (!audioManager.isPlaying) {
    const { title, by } = queue[0];

    //keeping track of last played song
    audioManager.currentSong = queue[0];
    const audio = await play.stream(queue[0].url, {
      discordPlayerCompatibility: false,
      seek,
    });

    const resource = createAudioResource(audio.stream, {
      inlineVolume: false,
      inputType: audio.type,
    });

    if (seek === 0) {
      await textChannel.send(
        `:musical_note: Now playing ${title} by ${by} :musical_note:`
      );
    }

    audioPlayer.play(resource);
    audioManager.isPlaying = true;
    queue.shift();
  }

  audioPlayer.once(AudioPlayerStatus.Idle, () => {
    audioManager.isPlaying = false;
    if (queue.length !== 0) playSong({ audioManager });
  });
};

const playYt = async (audioManager) => {
  try {
    //add song to queue

    if (audioManager.isPlaying) return;
    else {
      playSong({ audioManager });
    }
  } catch (error) {
    console.log(error);
  }
};

const seekInterval = async ({ args, audioManager }) => {
  const { queue, currentSong } = audioManager;

  audioManager.isPlaying = false;

  queue.unshift(currentSong);
  playSong({ seek: args, audioManager });
};

const destroyConnection = (audioManager) => {
  const { connection, audioPlayer } = audioManager;
  connection.destroy();
  audioPlayer.removeAllListeners();
};

const radio = async (audioManager) => {
  const { currentSong, queue } = audioManager;
  const { relatedVideos } = currentSong;
  audioManager.queue = [];
  queue.unshift(currentSong);
  const addedResponse = [];

  for (const args of relatedVideos) {
    const addedVideo = await addToQ({ args, audioManager });
    addedResponse.push(addedVideo);
  }

  return addedResponse;
};
module.exports = {
  joinVoice,
  playYt,
  addToQ,
  destroyConnection,
  seekInterval,
  radio,
};
