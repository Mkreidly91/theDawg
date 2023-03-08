const theDawgError = require("../Errors/theDawgError");
const { normalMessageEmbed } = require("../Helpers/embeds.helpers");
const { pauseService } = require("../services");

const pauseController = async (message) => {
  const { channel } = message;
  const { response, error } = pauseService(message);
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  channel.send({ embeds: [normalMessageEmbed(response)] });
};

module.exports = pauseController;
