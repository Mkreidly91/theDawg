const { kreiksController } = require("../controllers");

const { voiceConnectionError } = require("../Errors/voiceErrors");

const kreiks = async (message) => {
  if (voiceConnectionError(message)) return;
  kreiksController(message);
};

module.exports = kreiks;
