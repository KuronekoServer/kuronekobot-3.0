const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "ボットの招待リンクを表示します。",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("ボットを招待する")
      .setColor("RANDOM")
      .setDescription(
        "** [こちらから](https://discord.com/oauth2/authorize?client_id=904368599752396852&scope=bot&permissions=338963472&%20applications.commands)招待できます。**\n**ご不明な点は[サポートサーバー](https://discord.gg/h5wW2rhduU)まで！**"
      )
      .setFooter(`${message.author.username}`);
    message.channel.send({ embeds: [embed] });
  },
};
