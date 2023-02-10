const { undeafenController } = require("../controllers");
const theDawgError = require("../Errors/theDawgError");

const undeafen = async (message) => {
  const members = message.mentions.members;
  if (members.size === 0) {
    new theDawgError(
      message.channel,
      `Please provide an argument: -undeafen @<user>`
    ).send();
    return;
  }
  undeafenController(message);
};

module.exports = undeafen;
