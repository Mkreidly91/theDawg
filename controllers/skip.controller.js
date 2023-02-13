const theDawgError = require("../Errors/theDawgError");
const { skipService } = require("../services");

const skipController = async (message) => {
  const { error } = skipService(message);
  if (error) {
    new theDawgError(message.channel, error).send();
    return;
  }
};

module.exports = skipController;
