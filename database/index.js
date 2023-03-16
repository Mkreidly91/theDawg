const { Collection } = require('discord.js');
const guildCollection = new Collection();

const getGuild = (guildId) => {
  return guildCollection.get(guildId);
};

const getAudioManager = (guildId) => {
  return guildCollection.get(guildId).audioManager;
};

const createAudioManager = (guildId) => {
  return (guildCollection.get(guildId).audioManager = {
    audioPlayer: null,
    textChannel: null,
    voiceChannel: null,
    connection: null,
    queue: [],
    isPlaying: false,
    currentSong: null,
  });
};

const getOrCreate = (guildId) => {
  const audioManager = getAudioManager(guildId);
  return audioManager ? audioManager : createAudioManager(guildId);
};

const resetState = (guildId) => {
  guildCollection.get(guildId).audioManager = {
    audioPlayer: null,
    textChannel: null,
    voiceChannel: null,
    connection: null,
    queue: [],
    isPlaying: false,
    currentSong: null,
  };
};

module.exports = {
  guildCollection,
  getGuild,
  getAudioManager,
  createAudioManager,
  getOrCreate,
  resetState,
};
