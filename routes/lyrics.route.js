const { lyricsController } = require('../controllers');
const { voiceConnectionError } = require('../Errors/voiceErrors');

const lyrics = async (message) => {
  const content = message.content.split(' ');
  content.shift();
  const args = content.join(' ');

  if (!content[0]) {
    if (voiceConnectionError(message)) return;
  }

  lyricsController({ message, args });
};

module.exports = lyrics;
