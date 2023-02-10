const theDawgError = require("../Errors/theDawgError");
const { resumeService } = require("../services");

const resumeController = async (message) => {
  const { error } = resumeService(message);
  if (error) {
    new theDawgError(message.channel, error).send();
    return;
  }
};

module.exports = resumeController;
