const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

const resultsToRowOfButtons = (results) => {
  const row = new ActionRowBuilder();

  results.forEach((song) => {
    const { fullTitle } = song;

    if (fullTitle.length >= 80) {
      label = `${fullTitle.substring(0, 77)}...`;
    } else {
      label = fullTitle;
    }

    const button = new ButtonBuilder()
      .setCustomId(fullTitle)
      .setLabel(label)
      .setStyle(ButtonStyle.Primary);

    row.addComponents(button);
  });
  return row;
};

module.exports = { resultsToRowOfButtons };
