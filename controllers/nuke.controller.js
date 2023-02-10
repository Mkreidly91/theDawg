const nukeController = async ({ message, args }) => {
  message.channel.bulkDelete(parseInt(args)).then((messages) =>
    message.channel.send(`deleted ${messages.size} messages`).then((message) =>
      setTimeout(() => {
        message.delete();
      }, 2000)
    )
  );
};

module.exports = nukeController;
