const theDawgError = require("../Errors/theDawgError");
const { lyricsService } = require("../services");
const { bold } = require("@discordjs/builders");
const { Events, ButtonStyle } = require("discord.js");
const { resultsToRowOfButtons } = require("../Helpers/buttonBuilder.helpers");
const {
  searchingEmbed,
  normalMessageEmbed,
} = require("../Helpers/embeds.helpers");
const { splitMsg } = require("../Helpers/util.helpers");

const lyricsController = async ({ message, args }) => {
  const { channel } = message;
  const { embed, file } = searchingEmbed();
  const msg = await channel.send({ embeds: [embed], files: [file] });
  const { response, error } = await lyricsService({ message, args });

  if (error) {
    await msg.delete();
    new theDawgError(channel, error).send();
    return;
  }
  //New Code

  const rows = resultsToRowOfButtons({ results: response, lyrics: true });

  const buttonsMessage = await msg.edit({
    content: `${bold("Choose lyrics:")}`,
    components: [...rows],
    embeds: [],
    files: [],
  });

  const collector = buttonsMessage.createMessageComponentCollector({
    time: 20_000, // how long you want it to collect for, in ms (this is 15 seconds)
  });

  collector.on("collect", async (interaction) => {
    if (interaction.isChatInputCommand()) return;
    if (!interaction.isButton()) return;
    await interaction.deferReply();
    const { customId } = interaction;
    const selectedSong = response.find((song) => {
      const { id } = song;
      return String(id) === customId;
    });
    if (selectedSong) {
      if (selectedSong?.instrumental) {
        const { fullTitle } = selectedSong;
        return await interaction.followUp(
          `${bold(fullTitle)} is an instrumental`
        );
      }

      const { fullTitle } = selectedSong;
      const lyrics = await selectedSong.lyrics();
      if (lyrics.length > 2000) {
        try {
          const lyricsArr = splitMsg(lyrics);
          await interaction.followUp(`${bold(fullTitle)}:\n\n`);
          for (const section of lyricsArr) {
            await channel.send(section);
          }

          return;
        } catch (error) {
          console.log(error);
        }
      }

      await interaction.followUp(`${bold(fullTitle)}:\n\n`);
      return channel.send(lyrics);
    }
  });
};

module.exports = lyricsController;
