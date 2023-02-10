const { Collection } = require("discord.js");
const guildCollection = new Collection();

const getGuild = (guildId) => {
  return guildCollection.get(guildId);
};

const getAudioManager = ({ guildId, channelId }) => {
  return guildCollection.get(guildId).audioManager[channelId];
};

const createAudioManager = ({ guildId, channelId }) => {
  return (guildCollection.get(guildId).audioManager[channelId] = {
    audioPlayer: null,
    textChannel: null,
    voiceChannel: null,
    connection: null,
    queue: [],
    isPlaying: false,
    currentSong: null,
  });
};

const getOrCreate = ({ guildId, channelId }) => {
  const audioManager = getAudioManager({ guildId, channelId });

  return audioManager
    ? audioManager
    : createAudioManager({ guildId, channelId });
};

const resetState = ({ guildId, channelId }) => {
  guildCollection.get(guildId).audioManager[channelId] = {
    audioPlayer: null,
    textChannel: null,
    voiceChannel: null,
    connection: null,
    queue: [],
    isPlaying: false,
    currentSong: null,
  };
};

const destroyConnection = ({ guildId, channelId }) => {
  const { connection, audioPlayer } = getAudioManager({ guildId, channelId });
  connection.destroy();
  audioPlayer.removeAllListeners();
  resetState({ guildId, channelId });
};

module.exports = {
  guildCollection,
  getGuild,
  getAudioManager,
  createAudioManager,
  getOrCreate,
};
