const theDawgError = require("../Errors/theDawgError");
const { membersVoiceService } = require("../services");

const muteController = async (message) => {
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
    member.voice.setMute(true);
    await message.channel.send(`Successfully muted ${user}`);
  });
};

module.exports = muteController;
