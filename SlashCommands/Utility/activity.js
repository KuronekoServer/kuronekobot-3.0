const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "activity",
  description: "Discordアクティビティーを起動する",
  options: [
    {
      name: "youtube",
      description: "YouTube Togetherを開始する",
      type: 'SUB_COMMAND'
    },
    {
      name: "chess",
      description: "Chess.ioを開始する  (ブーストレベル1が必要)",
      type: 'SUB_COMMAND'
    },
    {
      name: "awkword",
      description: "Awkword.ioを開始する",
      type: 'SUB_COMMAND'
    },
    {
      name: "sketchheads",
      description: "Sketch Headsを開始する",
      type: 'SUB_COMMAND'
    },
    {
      name: "fishington",
      description: "Fishington.ioを開始する",
      type: 'SUB_COMMAND'
    },
    {
      name: "lettertile",
      description: "Lettertile.ioを開始する (ブーストレベル1が必要)",
      type: 'SUB_COMMAND'
    },
    {
      name: "poker",
      description: "Poker.ioを開始する (ブーストレベル1が必要)",
      type: 'SUB_COMMAND'
    },
    {
      name: "spellcast",
      description: "Spellcast.ioを開始する (ブーストレベル1が必要)",
      type: 'SUB_COMMAND'
    },
    {
      name: "checkers",
      description: "Checkers.ioを開始する (ブーストレベル1が必要)",
      type: 'SUB_COMMAND'
    },
    {
      name: "puttparty",
      description: "Puttpartyを開始する (ブーストレベル1が必要)",
      type: 'SUB_COMMAND'
    },
    {
      name: "wordsnack",
      description: "Wordsnackを開始する",
      type: 'SUB_COMMAND'
    }

  ],
  run: async (client, interaction, args) => {

    if (interaction.options.getSubcommand() === 'youtube') {

      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }

      client.discordTogether.createTogetherCode(member.voice.channelId, 'youtube').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Youtube Together")
          .setDescription(`[こちらから](${invite.code})でYouTube Togetherを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("RED")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'awkword') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'awkword').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Awkword.io")
          .setDescription(`[こちらから](${invite.code})Awkword.ioを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'chess') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'chessDev').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Chess.io")
          .setDescription(`[こちらから](${invite.code})Chess.ioを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'betrayal') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'betrayal').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Betrayal.io")
          .setDescription(`[こちらから](${invite.code})Betrayal.ioを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'doodlecrew') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'sketchheads').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Sketch Heads")
          .setDescription(`[こちらから](${invite.code})Sketch Headsを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    }
    else if (interaction.options.getSubcommand() === 'fishington') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'fishington').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Fishington.io")
          .setDescription(`[こちらから](${invite.code})Fishington.ioを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'lettertile') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'lettertile').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Lettertile.io")
          .setDescription(`[こちらから](${invite.code})Lettertile.ioを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    }
    else if (interaction.options.getSubcommand() === 'poker') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'poker').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Poker.io")
          .setDescription(`[こちらから](${invite.code})Poker.ioを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'spellcast') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'spellcast').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Spellcast.io")
          .setDescription(`[こちらから](${invite.code})Spellcast.ioを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'checkers') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'checkers').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Checkers")
          .setDescription(`[こちらから](${invite.code})Checkersを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'puttparty') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'puttparty').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Puttparty")
          .setDescription(`[こちらから](${invite.code})Puttpartyを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    } else if (interaction.options.getSubcommand() === 'wordsnack') {
      let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

      if (!member.voice.channelId) {
        return interaction.reply('ボイスチャンネルに接続してください！')
      }
      client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'wordsnack').then(async (invite) => {

        let embed = new MessageEmbed()
          .setTitle("Wordsnack")
          .setDescription(`[こちらから](${invite.code})Wordsnackを起動できます！\n\`\`\`\nスマホ版Discordではご利用できません！\`\`\``)
          .setColor("ORANGE")
          .setFooter(`${interaction.member.user.username}`)

        return interaction.reply({ embeds: [embed] });
      });
    }
  }
}
