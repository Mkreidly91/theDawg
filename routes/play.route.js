const { playController } = require('../controllers');

const {
  voiceConnectionError,
  playArgsError,
} = require('../Errors/voiceErrors');

const play = async (message) => {
  if (voiceConnectionError(message)) return;

  const content = message.content.split(' ');
  content.shift();
  const args = content.join(' ');
  if (playArgsError({ textChannel: message.channel, args })) return;
  playController({ message, args });
};

module.exports = play;
