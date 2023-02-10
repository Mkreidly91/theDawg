const theDawgError = require("../Errors/theDawgError");
const { stopService } = require("../services");

const stopController = async (message) => {
  const { error } = stopService(message);
  if (error) {
    new theDawgError(message.channel, error).send();
    return;
  }
};

module.exports = stopController;
