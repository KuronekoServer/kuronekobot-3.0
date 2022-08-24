const OWNER_ID = require("../../config.json").OWNER_ID;
module.exports = {
  name: "shutdown",
  description: "Shut's down the bot",
  run: async (client, message, args) => {
    if (!OWNER_ID)
      return message.channel.send("no");

    message.channel.send("Shutting down...").then((m) => {
      client.destroy();
    });
    await message.channel.send("The Bot has been ShutDown");
  },
};
