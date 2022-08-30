const byeData = require("../../database/guildData/leavechannel");
const byemsg = require("../../database/guildData/leavemessage");
const { MessageEmbed } = require('discord.js')

module.exports = async (member) => {
 const avatar = member.user.avatarURL;

 const data = await byeData.findOne({
   GuildID: member.guild.id,
 });
 if (data) {
   const data2 = await byemsg.findOne({
     GuildID: member.guild.id,
   });
   if (data2) {
     var leavemessage = data2.ByeMsg;

     leavemessage = leavemessage.replace("{user.mention}", `${member}`);
     leavemessage = leavemessage.replace("{user.name}", `${member.user.tag}`);
     leavemessage = leavemessage.replace("{server}", `${member.guild.name}`);
     leavemessage = leavemessage.replace(
       "{membercount}",
       `${member.guild.memberCount}`
     );

     let embed = new MessageEmbed()
       .setDescription(`${leavemessage}`)
       .setThumbnail(member.user.avatarURL())
       .setColor("ORANGE");

     let channel = data.Bye;

     member.guild.channels.cache.get(channel).send({embeds: [embed]});
   } else if (!data2) {
     let embed2 = new MessageEmbed()
       .setTitle("またね！")
       .setThumbnail(member.user.avatarURL())
       .setDescription(
         `**${member.user.tag}** が退出したよ！また来てね！`
       )
       .setFooter(`現在参加人数は${member.guild.memberCount}人だよ！`)
       .setThumbnail(member.user.avatarURL())
       .setColor("ORANGE");

     let byechannel = data.Bye;

     member.guild.channels.cache.get(byechannel).send({embeds: [embed2]});
   }
 }
};
