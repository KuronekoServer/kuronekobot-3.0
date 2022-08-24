const Discord = module.require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    description: "ユーザー情報を表示",
    aliases: ["ui"],
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "管理者",
            "MANAGE_GUILD": "サーバーを管理",
            "MANAGE_ROLES": "ロールを管理",
            "MANAGE_CHANNELS": "チャンネルを管理",
            "KICK_MEMBERS": "メンバーを追放",
            "BAN_MEMBERS": "メンバーをBAN",
            "MANAGE_NICKNAMES": "ニックネームを管理",
            "MANAGE_EMOJIS": "絵文字を管理",
            "MANAGE_WEBHOOKS": "Webhookを管理",
            "MANAGE_MESSAGES": "メッセージを管理",
            "MENTION_EVERYONE": "@everyoneメンション権"
        }
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "None",
            "DISCORD_EMPLOYEE": "Discord社員",
            "DISCORD_PARTNER": "Discordパートナー",
            "BUGHUNTER_LEVEL_1": "バグハンター (Level 1)",
            "BUGHUNTER_LEVEL_2": "バグハンター (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "早期サポータ",
            "TEAM_USER": "チームユーザー",
            "VERIFIED_BOT": "認証ボット",
            "EARLY_VERIFIED_DEVELOPER": "早期認証ボット開発者"
        };
        var bot = {
            "true": "はい",
            "false": "いいえ"
        };
        const userlol = new Discord.MessageEmbed()
        .setAuthor(`ユーザー情報`, mention.user.avatarURL())
        .setThumbnail(usericon)
        .addField(`基本情報`, `ユーザーネーム \`${mention.user.username}\` \nタグ \`${mention.user.discriminator}\` \nニックネーム \`${nick}\``)
        .addField(`Overview`, `Badges: \`${flags[mention.user.flags.toArray().join(", ")]}\`\nボットである \`${bot[mention.user.bot]}\``)
        .addField(`サーバー内情報`, `ロール <@&${mention._roles.join(">  <@&")}> \n主な権限 \`${finalPermissions.join(', ')}\``)
        .addField(`その他情報`, `アカウント作成時 \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nサーバー参加時 \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`ID ${mention.user.id}`, mention.user.avatarURL())
        .setTimestamp()
        .setColor("RANDOM");
        message.channel.send({ embeds: [userlol] })
    }
}
