const { playController } = require("../controllers");
const theDawgError = require("../Errors/theDawgError");

const {
  voiceConnectionError,
  playArgsError,
} = require("../Errors/voiceErrors");

const play = async (message) => {
  const content = message.content.split(" ");
  content.shift();
  const args = content.join(" ");

  if (voiceConnectionError(message)) return;
  if (playArgsError({ textChannel: message.channel, args })) return;

  playController({ message, args });
};

module.exports = play;
