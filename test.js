const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // check if the user is trying to join a voice channel
  if (oldMember.channelID === null && newMember.channelID !== null) {
    // get the current hour
    let hour = new Date().getHours();
    // check if the current hour is between 22:00 and 00:00
    if (hour >= 12 || hour < 14) {
      // disable access to the voice channel
      newMember.setMute(true);
      console.log(`Muted ${newMember.user.tag}`);
    }
  }
});

client.login(token);
