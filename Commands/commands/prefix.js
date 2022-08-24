const prefixModel = require("../../database/guildData/prefix");

module.exports = {
  name: "prefix",
  description: "サーバーのプレフィックスを変える",
  userPerms: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
  
    const data = await prefixModel.findOne({
      GuildID: message.guild.id,
    });

    if (!args[0])
      return message.channel.send("プレフィックスを入力してください。");

    if (args[0].length > 5)
      return message.channel.send(
        "プレフィックスは5文字以下で設定してください。"
      );

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id,
      });

      message.channel.send(`プレフィックスを**\`${args[0]}\`**に設定しました。`);

      let newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id,
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`プレフィックスを**\`${args[0]}\`**に設定しました。`);

      let newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id,
      });
      newData.save();
    }
  },
};