const { muteController } = require("../controllers/");
const theDawgError = require("../Errors/theDawgError");

const mute = async (message) => {
  const members = message.mentions.members;
  console.log(members.size);
  if (members.size === 0) {
    new theDawgError(
      message.channel,
      `Please provide an argument: -mute @<user>`
    ).send();
    return;
  }
  muteController(message);
};

module.exports = mute;
