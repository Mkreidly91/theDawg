const { membersConnected } = require('../Helpers/modCommands.helpers');

const muteService = ({ message, mute }) => {
  const members = message.mentions.members;
  const [connectedMembers, notConnectedMembers] = membersConnected(members);

  const immune = [];
  const success = [];

  connectedMembers.forEach(async (member) => {
    const user = member.user.username;
    if (member.manageable) {
      member.voice.setMute(mute);
      success.push(user);
    } else {
      immune.push(user);
    }
  });

  return { notConnected: notConnectedMembers, success, immune };
};

module.exports = muteService;
