const discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "Utility",
    usage: "ping",
    description: "ボットのpingを表示する",
    ownerOnly: false,
    nsfwOnly: false,
    run: async (client, message, args) => {

     let start = Date.now();

     let pingEmbed = new discord.MessageEmbed()
     .setDescription("測定中...")
     .setColor("RANDOM")
  
  message.channel.send({ embeds: [pingEmbed] }).then(m => {
    
    let end = Date.now();
    
    let embed = new discord.MessageEmbed()
    .setAuthor("Pong!", message.author.avatarURL())
    .addField("API応答速度", Math.round(client.ws.ping) + "ms", true)
    .addField("メッセージ応答速度", end - start + "ms", true)
    .setColor("RANDOM");
    m.edit({ embeds: [embed] }).catch(e => message.channel.send(e))
    
  })

    }
};
