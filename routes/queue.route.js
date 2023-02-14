const { queueController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const queue = async (message) => {
  if (voiceConnectionError(message)) return;
  queueController(message);
};

module.exports = queue;
