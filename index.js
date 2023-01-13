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
const ping = require("./commands/ping");
const { mute } = require("./messageCommands/commands");

const {
  Guilds,
  GuildMessages,
  GuildIntegrations,
  MessageContent,
  GuildMembers,
  DirectMessages,
} = GatewayIntentBits;
require("dotenv").config();

const theDawgError = require("./Errors/theDawgError");
const Commands = require("./messageCommands/commands");
const { channelController } = require("./clientFunctions");
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
  console.log(voiceChannel.joinable);

  // voiceChannel
  //   .send({
  //     files: [
  //       {
  //         attachment:
  //           "/Users/mostafa/Desktop/Discord-Bot/Resources/Oddling.mp3",
  //         name: "Oddlng.mp3",
  //         description: "A description of the file",
  //       },
  //     ],
  //   })
  //   .then(console.log)
  //   .catch(console.error);
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
  channelController(message);
});
const date = new Date().getTime();

client.on(Events.MessageDelete, (message) => {
  // message.channel.send(`Gotcha! Someone deleted "${message.content}"`);
});

// Log in to Discord with your client's token
client.login(TOKEN);
