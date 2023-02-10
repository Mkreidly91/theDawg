const theDawgError = require("../Errors/theDawgError");
const { pauseService } = require("../services");

const pauseController = async (message) => {
  const { error } = pauseService(message);
  if (error) {
    new theDawgError(message.channel, error).send();
    return;
  }
};

module.exports = pauseController;
