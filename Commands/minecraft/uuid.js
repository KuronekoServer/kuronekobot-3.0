const mojang = require('mojang-api');

module.exports = {
    name: 'uuid',
    description: 'プレイヤー名からuuidを検索します。',
    args: '<nickname>',
    run: async (client, message, args) => {
        //check if there're arguments
        if(!args.length) {
            message.reply('プレイヤー名を指定してください');
            return;
        }
        //send request to find uuid
        mojang.nameToUuid(args[0], (err, resp) => {
            if(err || !resp.length) {
                console.log(err);
                message.reply('エラー発生');
            }
            else message.channel.send(resp[0].name + 'のUUIDは' + `${resp[0].id}` + "です");
        });
    }
}