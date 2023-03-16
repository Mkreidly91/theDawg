const path = require('path');
const { getAudioManager, getOrCreate } = require('../database');
const { playCustom, joinVoice } = require('../Helpers/voice.helpers');

const topG_service = async (message) => {
  const {
    guild: { id: guildId },
  } = message;

  const topGMp3 = path.resolve('Resources', 'topG.mp3');
  const audioManager = joinVoice({
    message,
    audioManager: getOrCreate(guildId),
  });
  audioManager.queue = [];
  audioManager.currentSong = null;
  audioManager.isPlaying = false;
  playCustom(topGMp3, getAudioManager(guildId));
};

module.exports = topG_service;
