const { membersConnected } = require('../Helpers/modCommands.helpers');

const deafenService = ({ message, deaf }) => {
  const members = message.mentions.members;
  const [connectedMembers, notConnectedMembers] = membersConnected(members);

  const immune = [];
  const success = [];

  connectedMembers.forEach(async (member) => {
    const user = member.user.username;
    if (member.manageable) {
      member.voice.setDeaf(deaf);
      success.push(user);
    } else {
      immune.push(user);
    }
  });

  return { notConnected: notConnectedMembers, success, immune };
};

module.exports = deafenService;
