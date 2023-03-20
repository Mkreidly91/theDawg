const { normalMessageEmbed } = require('../Helpers/embeds.helpers');
const { PermissionsBitField } = require('discord.js');
const theDawgError = require('../Errors/theDawgError');

const nukeController = async ({ message, args }) => {
  const { channel, member } = message;
  const {
    user: { username },
  } = member;
  const { ManageMessages } = PermissionsBitField.Flags;

  if (!member.permissions.has(ManageMessages)) {
    return new theDawgError(
      channel,
      `${username} does not have permission to perform this action.`
    ).send();
  }
  const deletedMessages = await channel.bulkDelete(parseInt(args));

  const response = await channel.send({
    embeds: [normalMessageEmbed(`Deleting ${deletedMessages.size} messages`)],
  });

  setTimeout(() => {
    response.delete();
  }, 4000);
};

module.exports = nukeController;
