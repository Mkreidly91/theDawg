const theDawgError = require("../Errors/theDawgError");
const { normalMessageEmbed } = require("../Helpers/embeds.helpers");
const { resumeService } = require("../services");

const resumeController = async (message) => {
  const { channel } = message;
  const { response, error } = resumeService(message);
  if (error) {
    new theDawgError(message.channel, error).send();
    return;
  }
  channel.send({ embeds: [normalMessageEmbed(response)] });
};

module.exports = resumeController;
