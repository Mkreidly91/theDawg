const { unmuteController } = require("../controllers");
const theDawgError = require("../Errors/theDawgError");

const unmute = async (message) => {
  const members = message.mentions.members;
  if (members.size === 0) {
    new theDawgError(
      message.channel,
      `Please provide an argument: -unmute @<user>`
    ).send();
    return;
  }
  unmuteController(message);
};

module.exports = unmute;
