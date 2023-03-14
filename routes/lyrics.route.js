const { lyricsController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");
const geniusClient = require("../Genius");

const lyrics = async (message) => {
  const content = message.content.split(" ");
  content.shift();
  const args = content.join(" ");
  console.log(content);
  if (!content[0]) {
    if (voiceConnectionError(message)) return;
  }

  lyricsController({ message, args });
};

module.exports = lyrics;
