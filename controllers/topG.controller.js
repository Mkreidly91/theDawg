const { normalMessageEmbed } = require("../Helpers/embeds.helpers");
const { topG_service } = require("../services");

const topGController = async (message) => {
  const { channel } = message;
  await topG_service(message);
  await channel.send({
    embeds: [
      normalMessageEmbed(
        "My unmatched perspicacity, coupled with sheer indefatigability, makes me a feared opponent in any realm of human endeavor."
      ),
    ],
  });
};

module.exports = topGController;
