const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "config",
    description: "設定メニューを表示する",
    options: [
        {
            name: "welcomer",
            description: "参加・退出メッセージを設定する",
            type: 'SUB_COMMAND',
        },
    ],
    run: async(client, interaction, args)=>{
        
        if (interaction.options.getSubcommand() === "welcomer") {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has("MANAGE_GUILD")) {
                return interaction.reply("あなたはこれを利用する権限が足りません！")
            }
            const welcomerMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("welcomerMenu")
                .setPlaceholder("参加・退出メッセージ設定メニュー")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "参加メッセージチャンネル",
                        description: "参加メッセージが送信されるチャンネルを設定する",
                        value: "welcome_channel",
                    },
                    {
                        label: "退出メッセージチャンネル",
                        description: "退出メッセージを設定する",
                        value: "leave_channel",
                    },
                    {
                        label: "参加メッセージ",
                        description: "参加メッセージを設定する",
                        value: "welcome_message",
                    },
                    {
                        label: "退出メッセージ",
                        description: "退出メッセージを設定する",
                        value: "leave_message",
                    },
                    {
                        label: "変数表示",
                        description: "参加・退出メッセージで使える変数を表示する",
                        value: "variables",
                    }
                ])
            )

            return interaction.reply({ content: "このメッセージは設定する際毎回編集されます。\n" ,components: [welcomerMenu]})
        }
    }
}