const Discord = require("discord.js");
const blacklist = require('../../database/guild-blacklist')

module.exports = {
  name: "guild-blacklist",
  aliases: ["gbl-add"],
  description: "",
  category: "Developers",
  usage: "gbl-add <mention/ID>",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!["800027418416250901"].includes(message.author.id))
    return message.channel.send(
        `**Nope! | this command is dev only :smirk:**`
      );

    const guild = client.guilds.cache.find(e => e.id == args[0]);
    if(!guild) return message.channel.send(":x: | Guild not found!");

    blacklist.findOne({ id: guild.id }, async(err, data) =>{ 
        if(err) throw err;
        if(data) {
        return message.channel.send(':x: | This guild is already on the blacklist!')
    };
    
    
    data = new blacklist({ id: guild.id })
    data.save().catch(err => message.channel.send(`:warning: | **${err.name}:** ${err.message}`))
    message.channel.send(`:white_check_mark: | **${guild}** was successfully added to the blacklist!`)
    

    })

  }
}