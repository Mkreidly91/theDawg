const { topGController } = require("../controllers");

const {
  voiceConnectionError,
  topGArgsError,
} = require("../Errors/voiceErrors");

const topG = async (message) => {
  if (voiceConnectionError(message)) return;
  topGController(message);
};

module.exports = topG;
