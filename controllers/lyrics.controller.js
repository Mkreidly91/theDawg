const theDawgError = require("../Errors/theDawgError");
const { lyricsService } = require("../services");
const { bold } = require("@discordjs/builders");
const { Events, ButtonStyle } = require("discord.js");
const { resultsToRowOfButtons } = require("../Helpers/buttonBuilder.helpers");

const lyricsController = async ({ message, args, client }) => {
  const { channel } = message;
  const { response, error } = await lyricsService({ message, args });

  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  //New Code
  if (Array.isArray(response)) {
    const rows = resultsToRowOfButtons({ results: response, lyrics: true });

    const buttonsMessage = await channel.send({
      content: `${bold("Choose lyrics:")}`,
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
        if (selectedSong?.instrumental) {
          const { fullTitle } = selectedSong;
          return await interaction.followUp(
            `${bold(fullTitle)} is an instrumental`
          );
        }
        try {
          const { fullTitle } = selectedSong;
          const lyrics = await selectedSong.lyrics();
          if (lyrics.length > 2000) {
            let lyricsArr = [];
            for (let i = 0; i < lyrics.length; i += 2000) {
              lyricsArr.push(lyrics.substring(i, i + 2000));
            }
            await interaction.followUp(`${bold(fullTitle)}:\n\n`);
            for (const section of lyricsArr) {
              await channel.send(section);
            }

            return;
          }
          await interaction.followUp(`${bold(fullTitle)}:\n\n`);
          return channel.send(lyrics);
        } catch (error) {
          console.log(error);
          await interaction.followUp("No result was found");
        }
      }
    });
  } else {
    await channel.send(response);
  }
};

module.exports = lyricsController;
