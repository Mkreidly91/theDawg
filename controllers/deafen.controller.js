const theDawgError = require('../Errors/theDawgError');
const { deafenService } = require('../services');
const { PermissionsBitField } = require('discord.js');
const { normalMessageEmbed } = require('../Helpers/embeds.helpers');

const deafenController = async (message) => {
  const { member, channel } = message;
  const {
    user: { username },
  } = member;

  const { MuteMembers } = PermissionsBitField.Flags;
  if (!member.permissions.has(MuteMembers)) {
    return new theDawgError(
      channel,
      `${username} does not have permission to perform this action.`
    ).send();
  }

  const { notConnected, success, immune } = deafenService({
    message,
    deaf: true,
  });

  if (notConnected[0]) {
    await new theDawgError(
      channel,
      `User(s): ${notConnected} ${
        notConnected.length > 1 ? 'are' : 'is'
      } not connected to voice.`
    ).send();
  }
  if (immune[0]) {
    new theDawgError(
      channel,
      `Users(s): ${immune} ${
        immune.length > 1 ? 'are' : 'is'
      } immune to this action.`
    ).send();
  }
  if (success[0]) {
    await channel.send({
      embeds: [
        normalMessageEmbed(`User(s): ${success} Successfully Deafened.`),
      ],
    });
  }
};

module.exports = deafenController;

