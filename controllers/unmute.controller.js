const theDawgError = require("../Errors/theDawgError");
const { membersVoiceService } = require("../services");

const unmuteController = async (message) => {
  const members = message.mentions.members;
  const [connectedMembers, notConnectedMembers] = membersVoiceService(members);

  notConnectedMembers.forEach((member) => {
    const user = member.user.username;
    new theDawgError(
      message.channel,
      `${user} is not connected to voice`
    ).send();
  });

  connectedMembers.forEach(async (member) => {
    const user = member.user.username;
    member.voice.setMute(false);
    await message.channel.send(`Successfully unmuted ${user}`);
  });
};

module.exports = unmuteController;
