const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  NoSubscriberBehavior,
  getVoiceConnection,
  VoiceConnectionStatus,
} = require('@discordjs/voice');
const { bold } = require('discord.js');

const play = require('play-dl');
const { resetState } = require('../database');
const { getBestSong } = require('./search.helpers');

const joinVoice = ({ message, audioManager }) => {
  if (audioManager.voiceChannel) return audioManager;

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
    audioManager.connection.subscribe(audioPlayer);

    //disconnect after 5 seconds of idle
    audioPlayer.once(AudioPlayerStatus.Idle, () => {
      if (audioManager.queue.length === 0) {
        setTimeout(() => {
          destroyConnection(audioManager);
          resetState(guildId);
        }, 5000);
      }
    });
    //Solution for random 1min connection disconnect caused by an update on Discord's side
    audioManager.connection.on('stateChange', (old_state, new_state) => {
      if (
        old_state.status === VoiceConnectionStatus.Ready &&
        new_state.status === VoiceConnectionStatus.Connecting
      ) {
        audioManager.connection.configureNetworking();
      }
    });
  }

  return audioManager;
};

//Implementing Search
const searchSong = async (args, getAllResults = false) => {
  const validate = play.yt_validate(args);
  switch (validate) {
    case 'search': {
      const searched = await play.search(args, {
        source: { youtube: 'video' },
      });

      if (!getAllResults) {
        const bestResult = getBestSong(args, searched);
        try {
          const info = await play.video_basic_info(bestResult.url);
          return { info, type: 'search' };
        } catch (error) {
          return { error, type: 'search' };
        }
      } else {
        const videos = await Promise.allSettled(
          searched.map(async (song) => {
            const songInfo = await play.video_basic_info(song.url);
            return songInfo;
          })
        );
        return { info: videos, type: 'search' };
      }
    }

    case 'video': {
      try {
        const info = await play.video_basic_info(args);
        return { info, type: 'video' };
      } catch (error) {
        return { error, type: 'video' };
      }
    }

    case 'playlist': {
      const playlistInfo = await play.playlist_info(args);
      const videos = await Promise.allSettled(
        playlistInfo.videos.map(async (video) => {
          const videoInfo = await play.video_basic_info(video.url);
          return videoInfo;
        })
      );
      const info = [playlistInfo, videos];
      return { info, type: 'playlist' };
    }
  }
};

const addToQ = async ({ args, audioManager, song }) => {
  let { queue } = audioManager;

  // if (queue.length + 1 === 25) {
  //   return { error: "Queue limit reached" };
  // }
  if (song) {
    const { title, by } = song;
    queue.push(song);
    return {
      addedResponse: `${bold(title)} by ${bold(by)} was added to queue`,
    };
  }
  const { info, type, error } = await searchSong(args);

  if (error) {
    switch (type) {
      case 'search':
      case 'playlist':
        return { error: `Oops,something went wrong, try -search ${args}` };
      case 'video':
        return { error: `Oops,something went wrong` };
    }
  }

  if (type === 'playlist') {
    const [playlistInfo, videos] = info;
    const { title, channel } = playlistInfo;
    videos.forEach((promise) => {
      if (promise.status === 'rejected') return;
      const { title, channel, url, durationInSec, durationRaw } =
        promise.value.video_details;
      queue.push({
        title,
        by: channel.name,
        url,
        relatedVideos: promise.value.related_videos,
        duration: durationInSec,
        durationRaw,
      });
    });
    return {
      addedResponse: `Playlist: "${bold(title)}" by ${bold(
        channel.name
      )} was added to queue`,
    };
  } else {
    const { title, channel, url, durationInSec, durationRaw } =
      info.video_details;

    queue.push({
      title,
      by: channel.name,
      url,
      relatedVideos: info.related_videos,
      duration: durationInSec,
      durationRaw,
    });

    return {
      addedResponse: `${bold(title)} by ${bold(
        channel.name
      )} was added to queue`,
    };
  }
};

const playSong = async ({ seek = 0, audioManager }) => {
  const { queue, audioPlayer } = audioManager;

  if (!audioManager.isPlaying) {
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
  if (audioManager.isPlaying) return;
  else {
    playSong({ audioManager });
  }
};
const playCustom = async (url, audioManager) => {
  const { audioPlayer } = audioManager;
  audioPlayer.stop();

  const resource = createAudioResource(url, {
    inlineVolume: false,
  });

  audioPlayer.play(resource);
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

  for (const args of relatedVideos) {
    await addToQ({ args, audioManager });
  }

  return { addedResponse: 'Successfully populated queue!' };
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
    .join('\n');

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
  playCustom,
};
