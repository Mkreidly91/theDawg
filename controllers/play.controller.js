const { channelLink } = require("discord.js");
const theDawgError = require("../Errors/theDawgError");

const { playService } = require("../services");

const playController = async ({ message, args }) => {
  const { channel } = message;
  const { addedResponse, error } = await playService({ message, args });
  if (error) {
    new theDawgError(channel, error);
    return;
  }
  await channel.send(addedResponse);
};

module.exports = playController;
