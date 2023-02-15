const { lyricsController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");
const geniusClient = require("../Genius");

const lyrics = async (message) => {
  if (voiceConnectionError(message)) return;
  lyricsController(message);
};

module.exports = lyrics;
