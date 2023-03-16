const theDawgError = require('../Errors/theDawgError');
const {
  collectingEmbed,
  normalMessageEmbed,
} = require('../Helpers/embeds.helpers');
const { radioService } = require('../services');

const radioController = async (message) => {
  const { channel } = message;
  const { embed, file } = collectingEmbed();
  const loading = await channel.send({ embeds: [embed], files: [file] });
  let { addedResponse, error } = await radioService(message);
  if (error) {
    new theDawgError(channel, error).send();
    return;
  }

  await loading.edit({
    embeds: [normalMessageEmbed(addedResponse)],
    files: [],
  });
};

module.exports = radioController;
