const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');

const {
  Guilds,
  GuildMessages,
  GuildIntegrations,
  MessageContent,
  GuildMembers,
  DirectMessages,
  GuildVoiceStates,
} = GatewayIntentBits;

require('dotenv').config();

const { guildCollection } = require('./database/index.js');
const { routeManager } = require('./Helpers/client.helpers');
const { TOKEN } = process.env;

// Create a new client instance
const client = new Client({
  intents: [
    Guilds,
    MessageContent,
    GuildMembers,
    DirectMessages,
    GuildMessages,
    GuildIntegrations,
    GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (c) => {
  // eslint-disable-next-line no-console
  console.log(`Ready! Logged in as ${c.user.tag}`);
  c.guilds.cache.forEach((guild) => {
    if (guild) {
      guildCollection.set(guild.id, {
        guildId: guild.id,
        guildName: guild.name,
        audioManager: {
          audioPlayer: null,
          textChannel: null,
          voiceChannel: null,
          connection: null,
          queue: [],
          isPlaying: false,
          currentSong: null,
        },
      });
    }
  });
});
client.on(Events.GuildCreate, (guild) => {
  guildCollection.set(guild.id, {
    guildId: guild.id,
    guildName: guild.name,
    audioManager: {
      audioPlayer: null,
      textChannel: null,
      voiceChannel: null,
      connection: null,
      queue: [],
      isPlaying: false,
      currentSong: null,
    },
  });
});

client.on(Events.GuildDelete, (guild) => {
  guildCollection.delete(guild.id);
});

client.on(Events.MessageCreate, async (message) => {
  try {
    routeManager(message);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

// Log in to Discord with your client's token
client.login(TOKEN);
