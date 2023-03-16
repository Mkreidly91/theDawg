const { getAudioManager } = require('../database');

const pauseService = (message) => {
  const { guildId } = message;

  const audioManager = getAudioManager(guildId);
  const { audioPlayer } = audioManager;

  if (!audioPlayer) {
    return { error: 'No audio player connected' };
  }

  audioPlayer.pause();
  return { response: 'Playback paused.' };
};

module.exports = pauseService;
