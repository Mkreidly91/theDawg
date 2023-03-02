const { bold } = require("discord.js");
const theDawgError = require("../Errors/theDawgError");
const { resultsToRowOfButtons } = require("../Helpers/buttonBuilder.helpers");
const { searchService } = require("../services");
const playController = require("./play.controller");
const { Events } = require("discord.js");
const searchController = async ({ message, args, client }) => {
  const { channel } = message;
  const { response, error } = await searchService({ message, args });
  const rows = resultsToRowOfButtons({ results: response, songs: true });

  const buttonsMessage = await channel.send({
    content: `${bold("Choose Song:")}`,
    components: [...rows],
  });

  client.once(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) return;
    if (!interaction.isButton()) return;
    await interaction.deferReply();
    const { customId } = interaction;
    const selectedSong = response.find((song) => {
      const { id } = song;
      return String(id) === customId;
    });
    if (selectedSong) {
      try {
        const { addedResponse, error } = await playController({
          message,
          song: selectedSong,
        });
        interaction.followUp(addedResponse);
      } catch (error) {
        interaction.followUp(error);
      }
    }
  });

  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
};

module.exports = searchController;
