module.exports = {
    name: "clear",
    description: "複数のメッセージを削除する",
     botPerms: ["MANAGE_MESSAGES"],
    userPerms: ["MANAGE_MESSAGES"],
   options: [
                {
                    name: 'number',
                    description: '1-100',
                    type: "INTEGER"
                }
            ],
             run: async(client, interaction, args) => {
       const msgnum = interaction.options.getInteger('number')
       interaction.reply('削除中...');
       interaction.channel.bulkDelete(msgnum);
    interaction.channel.send("削除が完了しました。");
  }
}
