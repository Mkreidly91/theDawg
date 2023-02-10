const { pauseController } = require("../controllers");
const {
  voiceConnectionError,
  playArgsError,
} = require("../Errors/voiceErrors");

const pause = async (message) => {
  if (voiceConnectionError(message)) return;

  pauseController(message);
};

module.exports = pause;
