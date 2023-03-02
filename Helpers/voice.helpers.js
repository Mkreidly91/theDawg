const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  NoSubscriberBehavior,
  getVoiceConnection,
  VoiceConnection,
} = require("@discordjs/voice");
const { bold } = require("discord.js");

const play = require("play-dl");
const { resetState } = require("../database");
const { getBestSong } = require("./search.helpers");

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
            resetState(guildId);
          }, 5000);
        }
      });
      audioManager.connection.on("stateChange", (oldstate, newstate) => {
        console.log(typeof guildId);
        console.log(oldstate.status, newstate.status);
      });
    }

    return audioManager;
  } catch (error) {
    console.log(error);
  }
};

//Implementing Search
const searchSong = async (args, getAllResults = false) => {
  const validate = await play.yt_validate(args);
  if (validate === "search") {
    const searched = await play.search(args, {
      source: { youtube: "video" },
    });

    // try filtering the search result to favor official artists
    if (!getAllResults) {
      const bestResult = getBestSong(searched);
      try {
        const info = await play.video_info(bestResult.url);
        return { info, type: "search" };
      } catch (error) {
        return { error };
      }
    } else {
      const videos = await Promise.allSettled(
        searched.map(async (song) => {
          const songInfo = await play.video_info(song.url);
          return songInfo;
        })
      );
      return { info: videos };
    }
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

const addToQ = async ({ args, audioManager, song }) => {
  let { queue } = audioManager;

  try {
    if (song) {
      const { title, by } = song;
      queue.push(song);
      return {
        addedResponse: `${bold(title)} by ${bold(by)} was added to queue`,
      };
    }
    const { info, type, error } = await searchSong(args);
    if (error) {
      return { error };
    }
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
      return {
        addedResponse: `Playlist: "${bold(title)}" by ${bold(
          channel.name
        )} was added to queue`,
      };
    } else {
      const { title, channel, url, durationInSec } = info.video_details;

      queue.push({
        title,
        by: channel.name,
        url,
        relatedVideos: info.related_videos,
        duration: durationInSec,
      });

      return {
        addedResponse: `${bold(title)} by ${bold(
          channel.name
        )} was added to queue`,
      };
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
      discordPlayerCompatibility: true,
      seek,
    });

    const resource = createAudioResource(audio.stream, {
      inlineVolume: false,
      inputType: audio.type,
    });

    if (seek === 0) {
      await textChannel.send(
        `:musical_note: Now playing ${bold(title)} by ${bold(
          by
        )} :musical_note:`
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

  audioPlayer.on(AudioPlayerStatus.AutoPaused, (status) => {
    // console.log(audioPlayer, audioManager);
  });
};

const playYt = async (audioManager) => {
  try {
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

const showQ = (audioManager) => {
  const { currentSong, queue } = audioManager;
  const { title, by } = currentSong;
  if (queue.length === 0 && !currentSong) return `queue is empty`;
  const queueSongs = queue
    .map((song, index) => {
      const { title, by } = song;
      return `${index + 2}:  ${bold(title)} by ${bold(by)}`;
    })
    .join("\n");

  return `1:  ${bold(title)} by ${bold(by)}\n${queueSongs}`;
};
module.exports = {
  joinVoice,
  playYt,
  addToQ,
  destroyConnection,
  seekInterval,
  radio,
  showQ,
  searchSong,
};
