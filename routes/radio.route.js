const { radioController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const radio = async (message) => {
  if (voiceConnectionError(message)) return;
  radioController(message);
};

module.exports = radio;
