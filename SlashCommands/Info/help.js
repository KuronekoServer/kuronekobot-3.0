const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
  name: "help",
  description: "ヘルプメニューを表示する",
  options: [
    {
      name: "command",
      description: "コマンドの詳細を表示する",
      type: 'STRING',
      required: false
    }
  ],
  run: async (client, interaction, args) => {
    let commandInfo = await interaction.options.getString("command")

    if (commandInfo) {
      let cmd = client.commands.get(commandInfo);

      if (!cmd) {
        return interaction.reply("不明なコマンドです！")
      } else if (cmd) {
        let description = cmd.description ? cmd.description : "なし";
        let aliases = cmd.aliases ? cmd.aliases.join(", ") : "なし";
        let botPerms = cmd.botPerms ? cmd.botPerms.join(", ") : "なし";
        let userPerms = cmd.userPerms ? cmd.userPerms.join(", ") : "なし";
        let ownerOnly = cmd.ownerOnly ? "Yes" : "No";
        let nsfwOnly = cmd.nsfwOnly ? "Yes" : "No";
        let cooldown = cmd.cooldown ? cmd.cooldown : "No cooldown.";
        let isDisabled = cmd.isDisabled ? "Yes" : "No";

        let helpEmbed = new MessageEmbed()
        .setTitle(`**${cmd.name}**の詳細`)
        .addField("名前", `${cmd.name}`, true)
        .addField("説明", `${description}`, true)
        .addField("短縮", `${aliases}`, true)
        .addField("ボットに必要な権限", `${botPerms}`, true)
        .addField("ユーザーに必要な権限", `${userPerms}`, true)
        .setColor("ORANGE")

        return interaction.reply({ embeds: [helpEmbed] });
      }
    } else {

    let helpMenu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder('ヘルプメニュー')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "基本",
          description: "基本コマンドを表示する",
          value: "fun",
          emoji: "🎲"
        },
        {
          label: "アクティビティー",
          description: "Discordアクティビティーを起動するコマンドを表示する",
          value: "activities",
          emoji: "🎮"
        },
        {
          label: "音楽",
          description: "音楽コマンドを表示する",
          value: "music",
          emoji: "🎵"
        },
      ])
    )

    let helpEmbed = new MessageEmbed()
    .setTitle('ヘルプメニュー')
    .setDescription('下からカテゴリーを選択してください！')
    .setColor("ORANGE")

    interaction.reply({ embeds: [helpEmbed], components: [helpMenu]})
    }
  }
};
