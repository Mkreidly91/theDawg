const theDawgError = require("../Errors/theDawgError");
const { radioService } = require("../services");

const radioController = ({ message, args }) => {
  const { channel } = message;
  let { error } = radioService({ message, args });
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
};

module.exports = radioController;
