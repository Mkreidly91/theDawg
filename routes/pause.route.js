const { pauseController } = require('../controllers');
const { voiceConnectionError } = require('../Errors/voiceErrors');

const pause = async (message) => {
  if (voiceConnectionError(message)) return;

  pauseController(message);
};

module.exports = pause;
