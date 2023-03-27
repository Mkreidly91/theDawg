const { lyricsController } = require('../controllers');
const { voiceConnectionError } = require('../Errors/voiceErrors');

const lyrics = async (message) => {
  const { content } = message;
  const args = content.replace('-lyrics', '').trim();

  if (!args) {
    if (voiceConnectionError(message)) return;
  }

  lyricsController({ message, args });
};

module.exports = lyrics;
