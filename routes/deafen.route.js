const { deafenController } = require("../controllers");
const theDawgError = require("../Errors/theDawgError");

const deafen = async (message) => {
  const members = message.mentions.members;
  if (members.size === 0) {
    new theDawgError(
      message.channel,
      `Please provide an argument: -deafen @<user>`
    ).send();
    return;
  }
  deafenController(message);
};

module.exports = deafen;
