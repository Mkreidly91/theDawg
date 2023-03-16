const { getAudioManager } = require('../database');

const resumeService = (message) => {
  const { guildid } = message;

  const audiomanager = getAudioManager(guildid);
  const { audioplayer } = audiomanager;

  if (!audioplayer) {
    return { error: 'no audio player connected' };
  }

  audioplayer.unpause();
  return { response: 'playback resumed.' };
};

module.exports = resumeService;
