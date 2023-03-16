const { topGController } = require('../controllers');

const { voiceConnectionError } = require('../Errors/voiceErrors');

const topG = async (message) => {
  if (voiceConnectionError(message)) return;
  topGController(message);
};

module.exports = topG;
