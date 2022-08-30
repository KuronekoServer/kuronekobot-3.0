const { MessageEmbed } = require("discord.js")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    let msg = await interaction.channel.messages.fetch(interaction.message.id)

    if (interaction.values[0] === "variables") {
        await interaction.deferUpdate()

        return msg.edit((`\`\`\`js
        {user.mention} - 参加・退出したユーザーをメンションする
        {user.name} - 参加・退出したユーザーのユーザー名
        {server} - サーバーの名前
        {membercount} - サーバーのメンバー数
        \`\`\`
        `))
    }
}