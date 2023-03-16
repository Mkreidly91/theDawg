const { getAudioManager, getOrCreate } = require('../database');
const path = require('path');
const { playCustom, joinVoice } = require('../Helpers/voice.helpers');

const kreikService = async (message) => {
  const { guildId } = message;

  const kreiksMp3 = path.resolve('Resources', 'Kreiks.mp3');
  const audioManager = joinVoice({
    message,
    audioManager: getOrCreate(guildId),
  });
  audioManager.queue = [];
  audioManager.currentSong = null;
  audioManager.isPlaying = false;
  playCustom(kreiksMp3, getAudioManager(guildId));
};

module.exports = kreikService;
