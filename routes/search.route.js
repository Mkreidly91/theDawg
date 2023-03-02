const { searchController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const search = async (message, client) => {
  const content = message.content.split(" ");
  content.shift();
  const args = content.join(" ");
  if (voiceConnectionError(message)) return;
  searchController({ message, args, client });
};

module.exports = search;
