const { khallisneController } = require('../controllers');
const theDawgError = require('../Errors/theDawgError');

const khallisne = async (message) => {
  const members = message.mentions.members;
  if (members.size === 0) {
    new theDawgError(
      message.channel,
      `Please provide a mention: -khallisne @<user>`
    ).send();
    return;
  }

  khallisneController(message);
};

module.exports = khallisne;
