const { normalMessageEmbed } = require("../Helpers/embeds.helpers");

const nukeController = async ({ message, args }) => {
  const { channel } = message;
  const deletedMessages = await channel.bulkDelete(parseInt(args));

  const response = await channel.send({
    embeds: [normalMessageEmbed(`deleting ${deletedMessages.size} messages`)],
  });

  setTimeout(() => {
    response.delete();
  }, 2000);
};

module.exports = nukeController;
