const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong"),
  execute: async (interaction) => {
    await interaction.reply("Pong!");
  },
};
