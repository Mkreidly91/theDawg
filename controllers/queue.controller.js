const theDawgError = require("../Errors/theDawgError");
const { splitMsg } = require("../Helpers/util.helpers");
const { queueService } = require("../services");

const queueController = async (message) => {
  const { channel } = message;

  let { response, error } = await queueService(message);
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }

  if (response.length <= 2000) {
    await channel.send(response);
  } else {
    const splitResponse = splitMsg(response);
    for (const chunk of splitResponse) {
      await channel.send(chunk);
    }
  }
};

module.exports = queueController;
