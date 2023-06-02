const theDawgError = require('../Errors/theDawgError');
const {
  searchingEmbed,
  normalMessageEmbed,
} = require('../Helpers/embeds.helpers');

const { playService } = require('../services');

const playController = async ({ message, args, song }) => {
  const { channel } = message;
  const { embed, file } = searchingEmbed();
  let msg;
  if (!song) {
    msg = await channel.send({ embeds: [embed], files: [file] });
  }
  const { addedResponse, error } = await playService({ message, args, song });
  if (song) return { addedResponse, error };

  if (error) {
    await msg.delete();
    new theDawgError(channel, error).send();
    return;
  }

  await msg.edit({
    embeds: [normalMessageEmbed(addedResponse)],
    files: [],
  });
};
module.exports = playController;
