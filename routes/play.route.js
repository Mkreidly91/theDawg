const { playController } = require('../controllers');

const {
  voiceConnectionError,
  playArgsError,
} = require('../Errors/voiceErrors');

const play = async (message) => {
  const { content } = message;
  if (voiceConnectionError(message)) return;

  const args = content.replace('-play', '').trim();

  if (playArgsError({ textChannel: message.channel, args })) return;
  playController({ message, args });
};

module.exports = play;
