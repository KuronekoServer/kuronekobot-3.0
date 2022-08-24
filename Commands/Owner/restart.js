//PM2で起動してなかったらこのコマンド使えません
const OWNER_ID = require("../../config.json").OWNER_ID;
const pm2 = require('pm2')

module.exports = {
  name: "restart",
  description: "Shut's down the bot",
  run: async (client, message, args) => {
    if (!OWNER_ID)
      return message.channel.send("no");

    message.channel.send("Initiating restart...").then((m) => {
        client.user.setActivity("再起動中...", { type: "COMPETING"})
        client.user.setPresence({ status: "idle" })
        pm2.restart('index');
    });
    await message.channel.send("A restart is now in progress.");
  },
};
