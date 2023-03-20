const { getAudioManager } = require('../database');

const resumeService = (message) => {
  const { guildId } = message;

  const audioManager = getAudioManager(guildId);
  const { audioPlayer } = audioManager;

  if (!audioPlayer) {
    return { error: 'no audio player connected' };
  }

  audioPlayer.unpause();
  return { response: 'playback resumed.' };
};

module.exports = resumeService;
