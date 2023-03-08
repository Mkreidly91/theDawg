const { bold } = require("discord.js");
const theDawgError = require("../Errors/theDawgError");
const { resultsToRowOfButtons } = require("../Helpers/buttonBuilder.helpers");
const { searchService } = require("../services");
const playController = require("./play.controller");
const { Events } = require("discord.js");
const {
  searchingEmbed,
  normalMessageEmbed,
} = require("../Helpers/embeds.helpers");

const searchController = async ({ message, args, client }) => {
  const { channel } = message;
  const { embed, file } = searchingEmbed();
  const msg = await channel.send({ embeds: [embed], files: [file] });
  const { response, error } = await searchService({ message, args });

  if (error) {
    new theDawgError(channel, error).send();
    return;
  }

  const rows = resultsToRowOfButtons({ results: response, songs: true });
  const buttonsMessage = await msg.edit({
    content: `${bold("Choose Song:")}`,
    components: [...rows],
    embeds: [],
    files: [],
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
        if (error) {
          console.log(error);
          // await interaction.followUp({
          //   embeds: [errorMessageEmbed(`theDawgError: ${error}`)],
          // });
          return;
        }
        await interaction.followUp({
          embeds: [normalMessageEmbed(addedResponse)],
          files: [],
        });
      } catch (error) {
        await interaction.followUp(error);
      }
    }
  });
};

module.exports = searchController;
