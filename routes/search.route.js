const { searchController } = require('../controllers');

const {
  voiceConnectionError,
  searchArgsError,
} = require('../Errors/voiceErrors');

const search = async (message) => {
  if (voiceConnectionError(message)) return;
  const content = message.content.split(' ');
  content.shift();
  const args = content.join(' ');
  if (searchArgsError({ textChannel: message.channel, args })) return;
  searchController({ message, args });
};

module.exports = search;
