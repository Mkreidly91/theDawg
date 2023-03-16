const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

const catSearchGif = path.resolve('Resources', 'gifs', 'searching-cat.gif');
const catLaptopGif = path.resolve('Resources', 'gifs', 'cat-laptop.gif');

const nowPlayingEmbed = (song) => {
  const { title, by, durationRaw } = song;
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Now Playing')

    .addFields(
      { name: ' ', value: title },
      { name: ' ', value: by },
      { name: ' ', value: `[0:00 - ${durationRaw}]` }
    );

  return embed;
};

const searchingEmbed = () => {
  const file = new AttachmentBuilder(catSearchGif);
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Searching...')
    .setImage('attachment://searching-cat.gif');

  return { embed, file };
};

const collectingEmbed = () => {
  const file = new AttachmentBuilder(catLaptopGif);
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Gathering songs...')
    .setImage('attachment://cat-laptop.gif');

  return { embed, file };
};
const normalMessageEmbed = (text) => {
  const embed = new EmbedBuilder().setColor(0x00ff00).setTitle(text);
  return embed;
};

const errorMessageEmbed = (text) => {
  const embed = new EmbedBuilder().setColor(0xff0000).setTitle(text);
  return embed;
};

module.exports = {
  nowPlayingEmbed,
  searchingEmbed,
  normalMessageEmbed,
  errorMessageEmbed,
  collectingEmbed,
};
