const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "botinfo",
  description: "ボット情報を表示する",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    const duration = moment
      .duration(client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    let embed = new Discord.MessageEmbed()
      .setAuthor("黒猫ちゃんbot", client.user.avatarURL())
      .setColor("RANDOM")
      .setDescription(
        `**ボット名 **${client.user.tag} \n**所有者 **KuronekoServer \n**合計コマンド数 **${client.commands.size} \n**ユーザー数 ** ${
          client.users.cache.size
        } \n**サーバー数 ** ${client.guilds.cache.size} \n**チャンネル数 ** ${
          client.channels.cache.size
        }`
      )
      .addField(
        "黒猫ちゃんbotみついて",
        "KuronekoServerが作成した面白い多機能bot"
      )
      .addField(
        "ご不明な点があれば",
        "**[サポートサーバー](https://discord.kuroneko6423.com)** **からお問い合わせください。**"
      )
      .setFooter("にゃー");
    message.channel.send({ embeds: [embed] });
  },
};
