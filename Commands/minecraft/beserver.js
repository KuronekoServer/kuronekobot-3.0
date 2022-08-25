const https = require('https');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'beserver',
    description: 'BEサーバーの情報を取得します。データは5分ごとに更新されます',
    args: '<address>',
    options: [
        {
            name: "address",
            type: "STRING"
        }
    ],
    run: async (client, message, args) => {
        //check if there're arguments
        if(!args.length) {
            message.reply('サーバーのアドレスを指定してください。');
            return;
        }
        //create new request
        const options = {
            hostname: 'api.mcsrvstat.us',
            port: 443,
            path: '/bedrock/2/' + args[0],
            method: 'GET'
        }
        const request = https.request(options, response => {
            let str = '';
            response.on('data', data => {
                str += data;
            });
            response.on('end', () => {
                resp = JSON.parse(str);
                if(!resp.hostname) {
                    message.channel.send('サーバーが見つかりませんでした。');
                    return;
                }
                //create answer message with default offline data
                let embed = new MessageEmbed()
                .setColor("#00b300")
                .setTitle(args[0])
                .setDescription(":red_circle: オフライン")
                .setAuthor({name: "Minecraft Info", url: 'https://github.com/kuroneko6423/Minecraft-server-info-bot'})
                .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0]}`)
                .setTimestamp(new Date())
                .setFooter({text: "Created by 黒猫ちゃん | データは5分ごとに更新されます"});
                //fill with data if it's online
                if(resp.online) {
                    embed.setDescription(":green_circle: オンライン");
                    embed.addFields([
                        {
                            name: 'Motd',
                            value: (resp.motd) ? resp.motd.clean.join('\n') : 'None'
                        },
                        {
                            name: 'オンラインプレイヤー',
                            value: resp.players.online + '/' + resp.players.max
                        },
                        {
                            name: 'サーバーバージョン',
                            value: (Array.isArray(resp.version)) ? resp.version[0] : resp.version
                        },
                        {
                            name: 'プラグイン',
                            value: (resp.plugins) ? resp.plugins.names.join(', ') : 'None'
                        },
                        {
                            name: 'Mod',
                            value: (resp.mods) ? resp.mods.names.join(', ') : 'None'
                        }
                    ]);
                }
                //send answer
                message.reply({ embeds: [embed] });
            });
        });
        //error handling
        request.on('error', err => {
            console.log(err);
            message.channel.send('サーバーの情報を取得する際にエラーが発生しました。');
        })
        //close request
        request.end()
    }
}
