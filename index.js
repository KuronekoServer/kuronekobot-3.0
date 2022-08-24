const { ShardingManager } = require('discord.js');
const {BOT_TOKEN} = require("./config.json");

const manager = new ShardingManager('./bot.js', { token: BOT_TOKEN });

manager.on('shardCreate', shard => console.log(`シャード ${shard.id} を起動しました`));

manager.spawn();