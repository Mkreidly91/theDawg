const theDawgError = require("../Errors/theDawgError");
const { seekService } = require("../services");

const seekController = ({ message, args }) => {
  const { channel } = message;
  let { error } = seekService({ message, args });
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
};

module.exports = seekController;
