const theDawgError = require("../Errors/theDawgError");
const { queueService } = require("../services");

const queueController = async (message) => {
  const { channel } = message;

  let { response, error } = await queueService(message);
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }

  await channel.send(response);
};

module.exports = queueController;
