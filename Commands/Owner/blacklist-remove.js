const Discord = require("discord.js");
const blacklist = require('../../database/blacklist')


module.exports = {
  name: "blacklist-remove",
  aliases: ["bl-remove"],
  description: "",
  category: "Developers",
  usage: "bl-remove <mention/ID>",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!["800027418416250901"].includes(message.author.id))
    return message.channel.send(
        `dont be a moy and try to unblacklist urself :moyai: \n Contact the devs to contest your blacklist [Here](https://discord.gg/4gfEnY83nx) `
      );

    const user = client.users.cache.find(e => e.id == args[0]) || message.mentions.users.first();
    if(!user) return message.channel.send(":x: | Mention or enter a user's ID!");

    blacklist.findOne({ id: user.id }, async(err, data) =>{ 
        if(err) throw err;
        if(data) {
        await blacklist.findOneAndDelete({ id: user.id }).catch(err => message.channel.send(`:warning: | **${err.name}:** ${err.message}`))
        return message.channel.send(`:white_check_mark: | **${user.tag}** was successfully removed from the blacklist!`)
        }

        message.channel.send(':x: | That user is not on the blacklist!')
    })
  }
}