const { lyricsController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");
const geniusClient = require("../Genius");

const lyrics = async (message, client) => {
  const content = message.content.split(" ");
  content.shift();
  const args = content.join(" ");
  if (voiceConnectionError(message)) return;
  lyricsController({ message, args, client });
};

module.exports = lyrics;
