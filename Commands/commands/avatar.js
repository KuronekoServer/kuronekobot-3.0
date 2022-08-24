const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  description: "ユーザーのアバター画像を表示する",
  category: "Utility",
  usage: "avatar",
  cooldown: 3,
  run: async (client, message, args) => {

let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; 

const EmbedAvatar = new Discord.MessageEmbed()
 .setTitle(`:man_mage: **${user.username}** のアバター画像`)
 .setDescription(`:frame_photo: **ダウンロード形式**\n[GIF](${user.displayAvatarURL({format: "gif", size : 2048})}) | [PNG](${user.displayAvatarURL({format: "png", size : 2048})}) | [JPG](${user.displayAvatarURL({format: "jpg", size : 2048})}) | [WEBP](${user.displayAvatarURL({format: "webp", size : 2048})})`)
 .setImage(user.displayAvatarURL({dynamic: true, size : 2048 }))
 .setColor("RANDOM")
 .setFooter(`${message.author.username}`,  message.author.displayAvatarURL({dynamic: true}));
 message.channel.send({ embeds: [EmbedAvatar] });

  }
}