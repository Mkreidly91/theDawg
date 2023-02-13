const { seekController } = require("../controllers");
const theDawgError = require("../Errors/theDawgError");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const seek = (message) => {
  const { channel, content } = message;
  if (voiceConnectionError(message)) return;
  const args = content.split(" ")[1];

  if (!args || isNaN(parseInt(args))) {
    new theDawgError(
      channel,
      `Please provide a correct argument: "-seek {{number}}"`
    ).send();
    return;
  }
  seekController({ message, args });
};

module.exports = seek;
