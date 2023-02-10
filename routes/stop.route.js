const { stopController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const stop = async (message) => {
  if (voiceConnectionError(message)) return;
  stopController(message);
};

module.exports = stop;
