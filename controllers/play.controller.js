const theDawgError = require("../Errors/theDawgError");

const { playService } = require("../services");

const playController = async ({ message, args, song }) => {
  const { channel } = message;
  const { addedResponse, error } = await playService({ message, args, song });
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  if (song) return { addedResponse, error };
  await channel.send(addedResponse);
};

module.exports = playController;
