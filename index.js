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
const { channelController, routeManager } = require("./clientFunctions");
const { guildCollection } = require("./database/index.js");
const { TOKEN, PREFIX, GUILD_ID, TEXT_CHANNEL_ID, VOICE_CHANNEL_ID } =
  process.env;

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

let textChannel;
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  textChannel = client.channels.cache.get(TEXT_CHANNEL_ID);
  const voiceChannel = client.channels.cache.get(VOICE_CHANNEL_ID);

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

  // textChannel.send({
  // content: "I am the Dawg, the big bad Dawg",
  // files: [
  //   {
  //     attachment: "/Users/mostafa/Desktop/Discord-Bot/Resources/TheDawg.jpeg",
  //     name: "file.jpg",
  //     description: "A description of the file",
  //   },
  // ],
  // });
});

client.on(Events.MessageCreate, async (message) => {
  const { content, member } = message;

  if (!message.author.bot && message.channel.isDMBased()) {
    message.channel.send("shu baddak");
  }
  try {
    //channelController(message);
    routeManager(message, client);
  } catch (error) {
    console.log(error);
  }
});

client.on(Events.MessageDelete, (message) => {
  // message.channel.send(`Gotcha! Someone deleted "${message.content}"`);
});

// Log in to Discord with your client's token
client.login(TOKEN);
