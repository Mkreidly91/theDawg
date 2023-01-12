const theDawgCommand = require("./theDawgCommand");
const theDawgError = require("../Errors/theDawgError");

const mute = new theDawgCommand().setName("mute").setAction((message) => {
  const members = message.mentions.members;
  members.forEach((member) => {
    const isConnected = member.voice.channel;
    const user = member.user.username;
    if (!isConnected) {
      new theDawgError(
        message.channel,
        `${user} is not connected to voice`
      ).send();
      return;
    }
    member.voice.setMute(true);
    message.channel.send(`Successfully muted ${user}`);
  });
});

const unmute = new theDawgCommand().setName("unmute").setAction((message) => {
  const members = message.mentions.members;
  members.forEach((member) => {
    const isConnected = member.voice.channel;
    const user = member.user.username;
    if (!isConnected) {
      new theDawgError(
        message.channel,
        `${user} is not connected to voice`
      ).send();
      return;
    }
    member.voice.setMute(false);
    message.channel.send(`Successfully unmuted ${user}`);
  });
});

const deafen = new theDawgCommand().setName("deafen").setAction((message) => {
  const members = message.mentions.members;
  members.forEach((member) => {
    const isConnected = member.voice.channel;
    const user = member.user.username;
    if (!isConnected) {
      new theDawgError(
        message.channel,
        `${user} is not connected to voice`
      ).send();
      return;
    }
    member.voice.setDeaf(true);
    message.channel.send(`Successfully deafened ${user}`);
  });
});
const undeafen = new theDawgCommand().setName("deafen").setAction((message) => {
  const members = message.mentions.members;
  members.forEach((member) => {
    const isConnected = member.voice.channel;
    const user = member.user.username;
    if (!isConnected) {
      new theDawgError(
        message.channel,
        `${user} is not connected to voice`
      ).send();
      return;
    }
    member.voice.setDeaf(false);
    message.channel.send(`Successfully undeafened ${user}`);
  });
});

const nuke = new theDawgCommand().setName("nuke").setAction((message) => {
  const args = message.content.split(" ")[1];
  const isCorrectFormat = (args) => {
    const int = parseInt(args);
    if (!int) return false;
    return int > 0 && int <= 100;
  };
  console.log(isCorrectFormat(args));

  if (!isCorrectFormat(args)) {
    new theDawgError(
      message.channel,
      `Please provide correct argument, a number between 1 and 100`
    ).send();
    return;
  }
  message.channel
    .bulkDelete(parseInt(args))
    .then(() => message.channel.send(`deleted ${args} messages`))
    .then((message) => message.delete(300));
});

const khallisne = new theDawgCommand()
  .setName("ta3a khallisne")
  .setAction((message) => {
    const members = message.mentions.members;
    members.forEach((member) => {
      message.channel.send(`Successfully annoyed ${member.user.username}`);
      let i = 0;

      const intervalId = setInterval(() => {
        member.send("YALLLLA");
        i++;
        if (i === 10) {
          clearInterval(intervalId);
        }
      }, 1000);
    });
  });
module.exports = { mute, unmute, deafen, undeafen, nuke, khallisne };
