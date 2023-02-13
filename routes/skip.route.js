const { skipController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const skip = (message) => {
  if (voiceConnectionError(message)) return;
  skipController(message);
};

module.exports = skip;
