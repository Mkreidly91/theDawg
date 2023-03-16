const khallisneController = async (message) => {
  const { members } = message.mentions;
  members.forEach((member) => {
    message.channel.send(`Successfully annoyed ${member.user.username}`);
    let i = 0;
    const intervalId = setInterval(() => {
      member.send('YALLLLA');
      i++;
      if (i === 10) {
        clearInterval(intervalId);
      }
    }, 1000);
  });
};

module.exports = khallisneController;
