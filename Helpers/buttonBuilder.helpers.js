const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ButtonStyle } = require('discord.js');

const resultsToRowOfButtons = ({ results, lyrics, songs }) => {
  let objects;
  if (results.length > 25) {
    objects = results.slice(0, 25);
  } else {
    objects = results;
  }

  const rows = createRowsForButtons(objects.length);

  if (lyrics) {
    let i = 0;
    objects.forEach((song, index) => {
      const { fullTitle, id } = song;
      const button = new ButtonBuilder()
        .setCustomId(`${id}`)
        .setLabel(
          fullTitle.length > 80 ? `${fullTitle.substring(0, 77)}...` : fullTitle
        )
        .setStyle(ButtonStyle.Primary);
      if (index !== 0 && index % 5 === 0) i++;
      rows[i].addComponents(button);
    });
  } else if (songs) {
    let i = 0;
    objects.forEach((song, index) => {
      const { title, by, id } = song;
      const fullTitle = `${title} by ${by}`;
      const button = new ButtonBuilder()
        .setCustomId(`${id}`)
        .setLabel(
          fullTitle.length > 80 ? `${fullTitle.substring(0, 77)}...` : fullTitle
        )
        .setStyle(ButtonStyle.Primary);

      if (index !== 0 && index % 5 === 0) i++;
      rows[i].addComponents(button);
    });
  }

  return rows;
};

const createRowsForButtons = (num) => {
  const numberOfRows = Math.ceil(num / 5);
  let rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(new ActionRowBuilder());
  }

  return rows;
};
module.exports = { resultsToRowOfButtons };
