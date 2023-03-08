const theDawgError = require("../Errors/theDawgError");
const { normalMessageEmbed } = require("../Helpers/embeds.helpers");
const { skipService } = require("../services");

const skipController = async (message) => {
  const { channel } = message;
  const { response, error } = skipService(message);
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  channel.send({ embeds: [normalMessageEmbed(response)] });
};

module.exports = skipController;
