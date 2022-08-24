const Discord = require("discord.js");
const blacklist = require('../../database/guild-blacklist')


module.exports = {
  name: "guild-blacklist-remove",
  aliases: ["gbl-remove"],
  description: "",
  category: "Developers",
  usage: "gbl-remove <mention/ID>",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!["800027418416250901"].includes(message.author.id))
    return message.channel.send(
        `Nope! Contact the devs to contest a guild blacklist here: https://discord.gg/4gfEnY83nx`
      );

    const guild = client.guilds.cache.find(e => e.id == args[0]);
    if(!guild) return message.channel.send(":x: | Guild not found!");

    blacklist.findOne({ id: guild.id }, async(err, data) =>{ 
        if(err) throw err;
        if(data) {
        await blacklist.findOneAndDelete({ id: guild.id }).catch(err => message.channel.send(`:warning: | **${err.name}:** ${err.message}`))
        return message.channel.send(`:white_check_mark: | **${guild}** was successfully removed from the blacklist!`)
        }

        message.channel.send(':x: | That guild is not on the blacklist!')
    })
  }
}