const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  generateDependencyReport,
  AudioPlayerStatus,
  NoSubscriberBehavior,
  getVoiceConnection,
} = require("@discordjs/voice");

const fs = require("fs");
const ytdl = require("ytdl-core");
const theDawgError = require("./Errors/theDawgError");
const { seekArgsError, audioPlayerError } = require("./Errors/voiceErrors");

const play = require("play-dl");
const guildCollection = require("./guildCollection");

const connectionObject = {
  audioPlayer: null,
  textChannel: null,
  voiceChannel: null,
  connection: null,
  queue: [],
  isPlaying: false,
  currentSong: null,
};

const resetState = () => {
  connectionObject.audioPlayer = null;
  connectionObject.textChannel = null;
  connectionObject.voiceChannel = null;
  connectionObject.connection = null;
  connectionObject.queue = [];
  connectionObject.isPlaying = false;
  connectionObject.currentSong = null;
};

const destroyConnection = () => {
  const { connection, audioPlayer } = connectionObject;
  connection.destroy();
  audioPlayer.removeAllListeners();
  resetState();
};

//Implementing Search
const searchSong = async (string) => {
  const validate = await play.yt_validate(string);
  if (validate === "search") {
    const searched = await play.search(string, {
      source: { youtube: "video" },
    });
    const info = await play.video_info(searched[0].url);
    return { info, type: "search" };
  } else if (validate === "video") {
    const info = await play.video_info(string);
    return { info, type: "video" };
  } else if (validate === "playlist") {
    const playlistInfo = await play.playlist_info(string);
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

const joinVoice = async ({ textChannel, voiceChannel }) => {
  const channelId = voiceChannel.id;
  const guildId = voiceChannel.guild.id;

  console.log(guildCollection);
  if (connectionObject.voiceChannel) return;

  //set the text channel and voice channel in connectionObject,so we can have access to them anywhere.

  connectionObject.textChannel = textChannel;
  connectionObject.voiceChannel = voiceChannel;

  try {
    const prevConnection = getVoiceConnection(guildId);

    //check if already Connected
    if (prevConnection) {
      connectionObject.connection = prevConnection;
    } else {
      const newConnection = joinVoiceChannel({
        channelId: channelId,
        guildId: guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
      });

      //connection configurations
      newConnection.joinConfig = {
        ...newConnection.joinConfig,
        selfDeaf: false,
      };
      connectionObject.connection = newConnection;
    }

    //new audioPlayer
    if (!connectionObject.audioPlayer) {
      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });

      //set the audio player in connectionObject and subcribe the connection
      connectionObject.audioPlayer = audioPlayer;
      const subscription = connectionObject.connection.subscribe(audioPlayer);

      //disconnect after 5 seconds of idle
      audioPlayer.once(AudioPlayerStatus.Idle, () => {
        if (connectionObject.queue.length === 0) {
          setTimeout(() => {
            destroyConnection();
          }, 5000);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const addToQ = async (string) => {
  let { textChannel, voiceChannel, queue } = connectionObject;
  try {
    const { info, type } = await searchSong(string);
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
      await textChannel.send(
        `Playlist: "${title}" by ${channel.name} was added to queue`
      );
    } else {
      const { title, channel, url, durationInSec } = info.video_details;

      queue.push({
        title,
        by: channel.name,
        url,
        relatedVideos: info.related_videos,
        duration: durationInSec,
      });
      await textChannel.send(`${title} by ${channel.name} was added to queue`);
    }
  } catch (error) {
    console.log(error);
  }
};

const playSong = async (seek = 0) => {
  const { queue, audioPlayer, textChannel } = connectionObject;

  if (!connectionObject.isPlaying) {
    const { title, by } = queue[0];

    //keeping track of last played song
    connectionObject.currentSong = queue[0];
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
    connectionObject.isPlaying = true;
    queue.shift();
  }

  audioPlayer.once(AudioPlayerStatus.Idle, () => {
    connectionObject.isPlaying = false;
    if (queue.length !== 0) playSong();
  });
};

const playYt = async (url) => {
  try {
    //add song to queue
    await addToQ(url);
    if (connectionObject.isPlaying) return;
    else {
      playSong();
    }
  } catch (error) {}
};

const playCustom = async (url) => {
  const { audioPlayer, textChannel } = connectionObject;
  if (audioPlayerError({ textChannel, audioPlayer })) return;
  audioPlayer.stop();
  connectionObject.queue = [];

  const resource = createAudioResource(url, {
    inlineVolume: false,
  });
  audioPlayer.play(resource);
};
// pause song
const pauseSong = () => {
  const { audioPlayer, textChannel } = connectionObject;
  if (audioPlayerError({ textChannel, audioPlayer })) return;
  audioPlayer.pause();
};
// resume song
const resumeSong = () => {
  const { audioPlayer, textChannel } = connectionObject;
  if (audioPlayerError({ textChannel, audioPlayer })) return;
  audioPlayer.unpause();
};

//skip
const skipSong = async () => {
  const { audioPlayer, textChannel } = connectionObject;
  if (audioPlayerError({ textChannel, audioPlayer })) return;
  audioPlayer.stop();
};

//stop
const stopMusic = async () => {
  let { audioPlayer, textChannel } = connectionObject;
  if (audioPlayerError({ textChannel, audioPlayer })) return;
  destroyConnection();
};

//seek
const seekInterval = async ({ args, audioManager }) => {
  const { queue, currentSong, audioPlayer, textChannel } = connectionObject;

  const num = parseInt(args);
  if (seekArgsError({ textChannel, args, currentSong })) return;
  connectionObject.isPlaying = false;

  queue.unshift(currentSong);
  playSong(num, audioManager);
};

//song radio
const radio = async () => {
  const { relatedVideos } = connectionObject;
  connectionObject.queue = [];
  relatedVideos.forEach(async());
};

module.exports = {
  playCustom,
  playYt,
  joinVoice,
  connectionObject,
  pauseSong,
  resumeSong,
  skipSong,
  stopMusic,
  searchSong,
  seekInterval,
};
