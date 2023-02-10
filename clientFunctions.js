const Commands = require("./messageCommands/commands");
const theDawgError = require("./Errors/theDawgError");
const { TOKEN, PREFIX, GUILD_ID, TEXT_CHANNEL_ID, VOICE_CHANNEL_ID } =
  process.env;

const isAdmin = (member) => {
  return member.roles.cache.find((role) => role.name === "Admin") !== undefined
    ? true
    : false;
};

const routes = require("./routes");

const channelController = (message) => {
  const { content, member } = message;
  if (!message.author.bot && !message.channel.isDMBased()) {
    if (content.trim().startsWith(PREFIX)) {
      if (isAdmin(member)) {
        const command = content.substring(1).split(" ")[0].toLowerCase();
        Commands[command]
          ? Commands[command].execute(message)
          : new theDawgError(message.channel, "Invalid Command").send();
      } else {
        new theDawgError(
          message.channel,
          "Access Denied, you do not have admin privileges"
        ).send();
      }
    }
  }
};
const routeManager = (message) => {
  const { content, member } = message;
  if (!message.author.bot && !message.channel.isDMBased()) {
    if (content.trim().startsWith(PREFIX)) {
      if (isAdmin(member)) {
        const command = content.substring(1).split(" ")[0];
        routes[command]
          ? routes[command](message)
          : new theDawgError(message.channel, "Invalid Command").send();
      } else {
        new theDawgError(
          message.channel,
          "Access Denied, you do not have admin privileges"
        ).send();
      }
    }
  }
};
module.exports = { channelController, routeManager };
