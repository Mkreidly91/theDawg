const { searchController } = require('../controllers');

const {
  voiceConnectionError,
  searchArgsError,
} = require('../Errors/voiceErrors');

const search = async (message) => {
  const { content } = message;
  if (voiceConnectionError(message)) return;
  const args = content.replace('-search', '').trim();
  if (searchArgsError({ textChannel: message.channel, args })) return;
  searchController({ message, args });
};

module.exports = search;
