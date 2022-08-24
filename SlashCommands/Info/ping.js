const discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "ボットのpingを表示する",
  options: null,
  run: async (client, interaction, args) => {

    let start = Date.now();

    let embed1 = new discord.MessageEmbed()
    .setDescription("測定中...")
    .setColor("RANDOM")

    await interaction.reply({
        embeds: [embed1]
      })
        let end = Date.now();

        let embed = new discord.MessageEmbed()
          .setTitle("Pong!")
          .addField("API応答速度", `${Math.round(client.ws.ping)}ms`, true)
          .addField("メッセージ応答速度", `${end - start}ms`, true)
          .setColor("RANDOM");

       interaction.editReply({ embeds: [embed] }).catch((e) => interaction.followUp(e));
  },
};
