const { playController } = require('../controllers');

const {
  voiceConnectionError,
  playArgsError,
} = require('../Errors/voiceErrors');

const play = async (message) => {
  const { content } = message;
  if (voiceConnectionError(message)) return;

  let args = content.replace('-play', '').trim();
  if (args.includes('&list')) {
    args = args.substring(0, args.indexOf('&list'));
  }

  if (await playArgsError({ textChannel: message.channel, args })) return;
  playController({ message, args });
};

module.exports = play;
