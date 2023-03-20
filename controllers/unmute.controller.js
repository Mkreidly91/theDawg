const theDawgError = require('../Errors/theDawgError');
const { muteService } = require('../services');
const { PermissionsBitField } = require('discord.js');
const { normalMessageEmbed } = require('../Helpers/embeds.helpers');

const unmuteController = async (message) => {
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

  const { notConnected, success, immune } = muteService({
    message,
    mute: false,
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
      embeds: [normalMessageEmbed(`User(s): ${success} Successfully unmuted.`)],
    });
  }
};

module.exports = unmuteController;
