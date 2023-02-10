const membersVoiceService = (members) => {
  let connected = [];
  let notConnected = [];

  members.forEach((member) => {
    const isConnected = member.voice.channel;
    if (!isConnected) notConnected.push(member);
    else connected.push(member);
  });

  return [connected, notConnected];
};

module.exports = membersVoiceService;
