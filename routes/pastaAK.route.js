const { pastaAKController } = require("../controllers");
const theDawgError = require("../Errors/theDawgError");

const pastaAK = async (message) => {
  const args = message.content.split(" ")[1];
  const checkFormat = (args) => {
    const int = parseInt(args);
    if (!int) return false;
    return int > 0 && int <= 10;
  };
  if (!checkFormat(args)) {
    new theDawgError(
      message.channel,
      `The argument should be between 1 & 10`
    ).send();
    return;
  }

  pastaAKController({ message, args });
};

module.exports = pastaAK;
