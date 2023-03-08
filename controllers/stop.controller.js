const theDawgError = require("../Errors/theDawgError");
const { normalMessageEmbed } = require("../Helpers/embeds.helpers");
const { stopService } = require("../services");

const stopController = async (message) => {
  const { channel } = message;
  const { response, error } = stopService(message);
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  channel.send({ embeds: [normalMessageEmbed(response)] });
};

module.exports = stopController;
