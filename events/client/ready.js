const chalk = require("chalk");
const mongoose = require("mongoose");
var os = require('os-utils');
const { mongoPass } = require("../../config.json"); 
module.exports = (client) => {

  const guildin = client.guilds.cache.size;
  const guildmember = client.users.cache.size;
  const shards = client.shard.count
  
 client.user.setPresence({ status: "online" });
let textList = ['/help | にゃ～', guildin + ' servers' + ' / ' + guildmember + ' members']
 client.user.setPresence({ status: "online" });
 client.user.setActivity("/help | にゃ～", { type: "COMPETING"});
 setInterval(() => {
   var text = textList[Math.floor(Math.random() * textList.length)];
  client.user.setActivity(text, { type: "COMPETING"});
}, 60000);

  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });

  let allChannels = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      allChannels.add(channel.id);
    });
  });

  console.log(
    chalk.bgMagentaBright.black(` ${client.guilds.cache.size} servers `),
    chalk.bgMagentaBright.black(` ${client.channels.cache.size} channels `),
    chalk.bgMagentaBright.black(` ${allMembers.size} members `),
    chalk.bgMagentaBright.black(` ${client.shard.count} shards `)
  );
  const bootlogs = client.channels.cache.get("1000717448980480030");
  bootlogs.send(`:smiley: KuronekoBot is now **UP**\n${client.guilds.cache.size} servers\n${client.channels.cache.size} channels\n${allMembers.size} members\n${client.shard.count} shards`);

  mongoose
    .connect(mongoPass, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      console.log(
        chalk.bgGreenBright.black(
          ` ${client.user.username} connected to Mongo DB `
        )
      )
    )
    .catch((err) =>
      console.log(
        chalk.bgRedBright.black(
          ` ${client.user.username} could not connect to mongo DB `
        )
      )
    );
};
