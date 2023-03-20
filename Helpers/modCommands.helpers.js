const membersConnected = (members) => {
  let connected = [];
  let notConnected = [];

  members.forEach((member) => {
    const user = member.user.username;
    const isConnected = member.voice.channel;
    if (!isConnected) notConnected.push(user);
    else connected.push(member);
  });

  return [connected, notConnected];
};

module.exports = { membersConnected };
