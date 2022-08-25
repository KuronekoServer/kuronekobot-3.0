const Discord = require('discord.js')

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "help_menu") {

        let msg = await interaction.channel.messages.fetch(interaction.message.id)

        if (interaction.values[0] === "settings") {
            await interaction.deferUpdate()

            const settingsEmbed = new Discord.MessageEmbed()
        .setTitle("Config Commands")
        .setDescription(
          "`/dashboard config`, `/dashboard logging`, `/dashboard welcomer`"
        )
        .setColor("RANDOM");

      await msg.edit({ embeds: [settingsEmbed] });

        } else if (interaction.values[0] === "fun") {
            await interaction.deferUpdate()

            const funEmbed = new Discord.MessageEmbed()
        .setTitle("基本コマンド")
        .setDescription(
          "`avatar`, `botinfo`, `invite`, `license`, `omikuji`, `ping`, `poll`, `prefix`, `stats`, `userinfo`"
        )
        .setColor("RANDOM");

        await msg.edit({ embeds: [funEmbed] });

        
        } else if (interaction.values[0] === "music") {
 
         await interaction.deferUpdate();
 
         const musicEmbed = new Discord.MessageEmbed()
         .setTitle(`音楽コマンド`)
         .setDescription("`/music clearqueue`, `/music info`, `/music jump`, `/music loop`, `/music lyrics`, `/music move`, `/music mute`, `/music pause`, `/music play`, `/music previousmusic`, `/music queue`, `/music remove`, `/music resume`, `/music unmute`, `/music volume`")
         .setColor("BLUE")
 
         await msg.edit({ embeds: [musicEmbed] })

        } else if (interaction.values[0] === "mc") {
 
          await interaction.deferUpdate();
  
          const MCEmbed = new Discord.MessageEmbed()
          .setTitle(`Minecraft関連コマンド`)
          .setDescription("`server`, `beserver`, `uuid`")
          .setColor("BLUE")
  
          await msg.edit({ embeds: [MCEmbed] })
 

        } else if (interaction.values[0] === "activities") {
            await interaction.deferUpdate()
            
        const activityEmbed = new Discord.MessageEmbed()
        .setTitle("アクティビティーコマンド")
        .setDescription(
          "`/activity awkword`, `/activity betrayal`, `/activity chess`, `/activity sketchheads`, `/activity fishington`, `/activity lettertile`, `/activity poker`, `/activity spellcast`, `/activity youtube`\n\n```スマホ版Discordはご利用できません！```"
        )
        .setColor("RANDOM")

        await msg.edit({ embeds: [activityEmbed]})
      }
    }
}
