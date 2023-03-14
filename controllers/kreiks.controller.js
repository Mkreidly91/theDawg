const { normalMessageEmbed } = require("../Helpers/embeds.helpers");
const { kreikService } = require("../services");

const kreiksController = async (message) => {
  const { channel } = message;
  await kreikService(message);
  await channel.send({
    embeds: [normalMessageEmbed("Kreeeeeeeeeiiiiiiiiikssss....nayyik")],
  });
};

module.exports = kreiksController;
