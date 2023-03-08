const theDawgError = require("../Errors/theDawgError");
const {
  collectingEmbed,
  normalMessageEmbed,
} = require("../Helpers/embeds.helpers");
const { radioService } = require("../services");

const radioController = async (message) => {
  try {
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
  } catch (err) {
    new theDawgError(channel, "Oops, something went wrong...");
  }
};

module.exports = radioController;
