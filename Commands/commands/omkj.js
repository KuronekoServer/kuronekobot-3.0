const Discord = require("discord.js");

module.exports = {
  name: "omikuji",
  description: "おみくじをする",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let arr = ["大吉", "中吉", "小吉", "吉", "凶", "大凶"];
    var random = Math.floor(Math.random() * arr.length);
    var result = arr[random];
    message.reply({content: result});
  },
};
