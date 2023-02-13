const theDawgError = require("../Errors/theDawgError");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const seek = (message) => {
  const { channel, content } = message;
  if (voiceConnectionError(message)) return;
  const args = content.split(" ")[1];
  if (!parseInt(args)) {
    new theDawgError(channel, "Please provide a number").send();
    return;
  }
};

module.exports = seek;
