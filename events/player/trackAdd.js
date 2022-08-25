const { MessageEmbed } = require("discord.js");

module.exports = async(queue, track) => {
    if (!queue.playing || queue.tracks.length <= 0) return;

    const embed = new MessageEmbed()
      .setTitle(`曲追加 - 再生待ち${queue.tracks.indexOf(track) +1}番目`)
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
      .setColor(queue.guild.me.displayColor || "#00FFFF");

    queue.metadata.editReply({ embeds: [embed], allowedMentions: { repliedUser: false } }).then(async(msg)=>{
      setTimeout(function(){
        msg.delete();
      }, 10000);
    })

};
