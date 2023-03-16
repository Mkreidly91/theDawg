const { nukeController } = require('../controllers');
const theDawgError = require('../Errors/theDawgError');

const nuke = async (message) => {
  const args = message.content.split(' ')[1];

  const checkFormat = (args) => {
    const int = parseInt(args);
    if (!int) return false;
    return int > 0 && int <= 100;
  };

  if (!checkFormat(args)) {
    new theDawgError(
      message.channel,
      `Please provide correct argument, a number between 1 and 100`
    ).send();
    return;
  }

  nukeController({ message, args });
};

module.exports = nuke;
