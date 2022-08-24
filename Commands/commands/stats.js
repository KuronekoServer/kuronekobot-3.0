const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = {
  name: "stats",
  descriptiom: "Get MikanBot's Stats",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args, level) => {
    // eslint-disable-line no-unused-vars
    try {
      const cmdFiles = await readdir("./Commands/");
      let cpuLol;
      cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D [days], H [hrs], m [mins], s [secs]");
        let bicon = client.user.displayAvatarURL;
        const RynEmb = new Discord.MessageEmbed()
          .setAuthor("MikanBot | Stats")
          .setTimestamp()
          .setThumbnail(bicon)
          .setColor("RANDOM")
          .setFooter(`${message.author.username}`,message.author.displayAvatarURL)
          .addField(":floppy_disk: メモリー使用率",`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() /1024 /1024).toFixed(2)} MB`,false)
          .addField(":minidisc: CPU使用率", `\`${percent.toFixed(2)}%\``, false)
          .addField("CPU",`\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,false)
          .addField(":computer: システム(arch)", `\`${os.arch()}\``, false)
          .addField(":desktop: プラットフォーム", `\`\`${os.platform()}\`\``, false)
          .addField("ユーザー数", `${client.users.cache.size}`, false)
          .addField("サーバー数", `${client.guilds.cache.size}`, false)
          .addField("チャンネル数", `${client.channels.cache.size}`, false)
          .addField("シャード数", `${client.shard.count}`, false)
          .addField("ライブラリー", `Discord.JS v${version}`, false)
          .addField("Node.JSバージョン", `${process.version}`, false)
          .addField(":stopwatch: アップタイム・ping",`${duration} / ${Math.round(client.ws.ping)}ms`,false)
          .addField(":stopwatch: サーバーアップタイム", `${(os.uptime())}`, false)
          .addField(":calendar_spiral: 作成時",`${client.user.createdAt}`,false)
        message.channel.send({ embeds: [RynEmb] });
      });
    } catch (err) {
      const errorlogs = client.channels.cache.get("1000717448980480030");
      message.channel.send(
        `エラーが発生しました。`
      );
      errorlogs.send(`Error on stats commands!\n\nError:\n\n ${err}`);
    }
  },
};
