const theDawgError = require('../Errors/theDawgError');
const { PREFIX } = process.env;

const isAdmin = (member) => {
  // return member.roles.cache.find((role) => role.name === "Admin") !== undefined
  //   ? true
  //   : false;

  return true;
};

const routes = require('../routes');

const routeManager = async (message, client) => {
  const {
    content,
    member,
    author: { bot },
    channel,
  } = message;
  const exclude = ['topG', 'pastaAk'];
  if (!bot && !channel.isDMBased()) {
    if (content.trim().startsWith(PREFIX)) {
      if (isAdmin(member)) {
        let command = content.substring(1).split(' ')[0];
        const excluded = exclude.includes(command);
        command = excluded ? command : command.toLowerCase();
        routes[command]
          ? routes[command](message, client)
          : new theDawgError(message.channel, 'Invalid Command').send();
      } else {
        new theDawgError(
          message.channel,
          'Access Denied, you do not have admin privileges'
        ).send();
      }
    }
  }
};
module.exports = { routeManager };
