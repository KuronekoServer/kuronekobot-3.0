const welcomeData = require("../../database/guildData/welcome");
const welcomemsg = require("../../database/guildData/joinmsg");
const { MessageEmbed } = require('discord.js')

module.exports = async (member) => {
 const avatar = member.user.avatarURL;

 const data = await welcomeData.findOne({
   GuildID: member.guild.id,
 });
 if (data) {
   const data2 = await welcomemsg.findOne({
     GuildID: member.guild.id,
   });
   if (data2) {
     var joinmessage = data2.JoinMsg;

     joinmessage = joinmessage.replace("{user.mention}", `${member}`);
     joinmessage = joinmessage.replace("{user.name}", `${member.user.tag}`);
     joinmessage = joinmessage.replace("{server}", `${member.guild.name}`);
     joinmessage = joinmessage.replace(
       "{membercount}",
       `${member.guild.memberCount}`
     );

     let embed = new MessageEmbed()
       .setDescription(joinmessage)
       .setThumbnail(member.user.avatarURL())
       .setColor("ORANGE");

     let channel = data.Welcome;

     member.guild.channels.cache.get(channel).send ({content: `${member}` ,embeds: [embed]});
     
   } else if (!data2) {
     let embed2 = new MessageEmbed()
     .setTitle("やあ！")
      .setDescription(
        `${member}、**${member.guild.name}**へようこそ！`
      )
      .setFooter(`現在参加人数は${member.guild.memberCount}人だよ！`)
      .setColor("ORANGE");
     
     let channel = data.Welcome

    member.guild.channels.cache.get(channel).send({ embeds: [embed2] });
   }
 }
};
