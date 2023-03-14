const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  REST,
  Partials,
  Routes,
  VoiceChannel,
} = require("discord.js");

const {
  Guilds,
  GuildMessages,
  GuildIntegrations,
  MessageContent,
  GuildMembers,
  DirectMessages,
  GuildVoiceStates,
} = GatewayIntentBits;
require("dotenv").config();

const theDawgError = require("./Errors/theDawgError");
const Commands = require("./messageCommands/commands");
const { routeManager } = require("./clientFunctions");
const { guildCollection } = require("./database/index.js");
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

client.on(Events.MessageCreate, async (message) => {
  const { content, member } = message;

  if (!message.author.bot && message.channel.isDMBased()) {
    message.channel.send("shu baddak");
  }
  try {
    routeManager(message);
  } catch (error) {
    console.log(error);
  }
});

// Log in to Discord with your client's token
client.login(TOKEN);
