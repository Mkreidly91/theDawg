const theDawgError = require("../Errors/theDawgError");
const { radioService } = require("../services");

const radioController = async (message) => {
  const { channel } = message;
  const loading = await channel.send("Loading");
  let { addedResponse, error } = await radioService(message);
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  const res = addedResponse.join("\n");
  await loading.edit(res);
};

module.exports = radioController;
