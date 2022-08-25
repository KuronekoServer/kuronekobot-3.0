const { MessageEmbed } = require('discord.js')
const { QueueRepeatMode } = require('discord-player');
const { waitForDebugger } = require('inspector');

module.exports = {
    name: "music",
    description: "サーバーで音楽を再生する",
    subCommands: ["play", "pause", "previoustrack", "info", "jump", "lyrics", "loop", "mute", "move", "queue", "remove", "resume", "seek", "shuffle", "skip", "stop", "volume", "unmute"],
    category: "Music",
    options: [
        {
            name: "clearqueue",
            description: "再生待ちリストを削除してVCから切断する",
            type: "SUB_COMMAND",
        },
        {
            name: "play",
            description: "曲を再生する",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "song",
                    description: "曲名またはURL",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "pause",
            description: "再生を一時停止する",
            type: "SUB_COMMAND"
        },
        {
            name: "previoustrack",
            description: "一つ前の曲に戻る",
            type: "SUB_COMMAND"
        },
        {
            name: "info",
            description: "現在再生中の曲の詳細を表示する",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "index",
                    description: "(任意)再生待ちリストの曲の番号",
                    type: "NUMBER",
                    required: false,
                }
            ]
        },
        {
            name: "jump",
            description: "再生待ちの曲を選択し再生する",
            type: 'SUB_COMMAND',
            options: [
                {
                    name: "index",
                    description: "再生待ちリストの曲の番号",
                    type: "NUMBER",
                    required: true,
                }
            ]
        },
        {
            name: "lyrics",
            description: "曲の歌詞を検索する",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "query",
                    description: "検索したい曲",
                    type: "STRING",
                    required: true,
                }
            ]
        },
        {
            name: "loop",
            description: "ループモードを設定する",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "mode",
                    description: "ループモードを選択してください。",
                    type: 'STRING',
                    required: false,
                    choices: [
                        {
                            name: "オフ",
                            value: "off"
                        },
                        {
                            name: "一曲",
                            value: "track"
                        },
                        {
                            name: "再生待ちの曲",
                            value: "queue"
                        },
                        {
                            name: "オートプレイ",
                            value: "autoplay"
                        }
                    ]
                }
            ]
        },
        {
            name: "mute",
            description: "消音する",
            type: "SUB_COMMAND",
        },
        {
            name: "move",
            description: "再生待ちの曲の順番を動かす",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "from",
                    description: "動かしたい曲の番号",
                    type: "NUMBER",
                    required: true
                },
                {
                    name: "to",
                    description: "動かしたい場所の場暗号",
                    type: 'NUMBER',
                    required: true
                }
            ]
        },
        {
            name: "queue",
            description: "再生待ちリストを表示する",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "page",
                    description: "ページ番号",
                    type: "NUMBER",
                    required: false,
                }
            ]
        },
        {
            name: "remove",
            description: "再生街リストから曲を削除する",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "index",
                    description: "削除したい曲の番号",
                    type: "NUMBER",
                    required: true,
                }
            ]
        },
        {
            name: "resume",
            description: "再生を再開する",
            type: "SUB_COMMAND"
        },
        {
            name: "seek",
            description: "曲を進める・巻き戻す",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "移動したい時間 <mm:ss>",
                    type: 'STRING',
                    required: true,
                }
            ]
        },
        {
            name: "shuffle",
            description: "再生街リストをシャッフルする",
            type: "SUB_COMMAND"
        },
        {
            name: "skip",
            description: "再生中の曲を飛ばす",
            type: "SUB_COMMAND"
        },
        {
            name: "stop",
            description: "再生を停止してVCから切断する",
            type: "SUB_COMMAND",
        },
        {
            name: "volume",
            description: "音量を調節する",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "設定したい音量(%)",
                    type: "NUMBER",
                    required: true,
                }
            ]
        },
        {
            name: "unmute",
            description: "消音を解除する",
            type: "SUB_COMMAND"
        }
    ],
    userPerms: ["CONNECT", "VIEW_CHANNEL"],
    noUserPermsMessage: `このコマンドを利用するには\`VCに接続\`と\`チャンネルを見る\`権限が必要です。`,
    botPerms: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    noBotPermsMessage: `ボットに\`VCに接続\`, \`チャンネルを見る\`, \`発言\`権限が必要です。`,
    run: async(client, interaction, args) => {


    await interaction.deferReply();
        if (interaction.options.getSubcommand() === "clearqueue") {
            const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
             return client.say.errorMessage(interaction, "現在再生していません。");

        if (!client.utils.canModifyQueue(interaction)) return;

        if (queue.tracks.length < 1)
             return client.say.warnMessage(interaction, "再生待ちの曲がありません。");

        queue.clear();

        return client.say.infoMessage(interaction, "再生待ちの曲を削除しました。");
        } else if (interaction.options.getSubcommand() === "play") {
            if (!client.utils.havePermissions(interaction))
      return client.say.errorMessage(interaction, "ボットに**\`埋め込みリンク\`**権限が必要です。");

    const string = await interaction.options.getString("song", true);

    const guildQueue = client.player.getQueue(interaction.guild.id);

    const channel = interaction.member?.voice?.channel;

    if (!channel)
      return client.say.warnMessage(interaction, "VCに接続してください。");

    if (guildQueue && channel.id !== interaction.guild.me.voice.channelId)
      return client.say.warnMessage(interaction, "他のVCで現在再生しています。");

    if (!channel?.viewable)
      return client.say.warnMessage(interaction, "ボットに**\`チャンネルを見る\`**権限が必要です。");
    if (!channel?.joinable)
      return client.say.warnMessage(interaction, "ボットに**\`VCに接続する\`**権限が必要です。");
    /**if (!channel?.speakable)
      return client.say.warnMessage(interaction, "I need **\`SPEAK\`** permission.");
    if (channel?.full)
      return client.say.warnMessage(interaction, "Can't join, the voice channel is full."); */

    let result = await client.player.search(string, { requestedBy: interaction.user }).catch(() => {});
    if (!result || !result.tracks.length)
      return client.say.errorMessage(interaction, `\`${string}\`の歌詞が見つかりません。`);

    let queue;
    if (guildQueue) {
      queue = guildQueue;
      queue.metadata = interaction;
    } else {
      queue = await client.player.createQueue(interaction.guild, {
        ytdlOptions: {
            quality: "highest",
            filter: "audioonly",
            highWaterMark: 1 << 25,
            dlChunkSize: 0
        },
        metadata: interaction
      });
    }

    try {
      if (!queue.connection) { 
        await queue.connect(channel);
      const embed = new MessageEmbed()
      .setAuthor("黒猫ちゃんbot", client.user.displayAvatarURL())
      .setDescription(`👍 ${queue.connection.channel.toString()} に接続し、📄 ${queue.metadata.channel.toString()}でコマンドを受け付けています。`)
      .setColor(queue.guild.me.displayColor || "#00FFFF");

      await interaction.editReply({ embeds: [embed]})
      }
      
    } catch (error) {
      client.logger.error("JOIN", error);
      client.player.deleteQueue(interaction.guild.id);
      return client.say.errorMessage(interaction, `VCに接続できませんでした。\n\`${error}\``);
    }

    result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

    if (!queue.playing) await queue.play();
        } else if (interaction.options.getSubcommand() === "pause") {
            const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "現在再生していません。");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.connection.paused)
      return client.say.warnMessage(interaction, "既に一時停止済みです。");

    queue.setPaused(true);
    return client.say.infoMessage(interaction, "再生を一時停止しました。");
        } else if (interaction.options.getSubcommand() === "previoustrack") {
            const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "現在再生していません。");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.previousTracks.length <= 1)
      return client.say.warnMessage(interaction, "一個前の曲がありません。");

    queue.back();

    return client.say.infoMessage(interaction, "一個前の曲を再生します。");

        } else if (interaction.options.getSubcommand() === "info") {

            const index = interaction.options.getNumber("index", false);

            const queue = client.player.getQueue(interaction.guild.id);
        
            if (!queue || !queue.current)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            let song = queue.current;
        
            if (index) {
              songNum = (index - 1);
        
              if (!queue.tracks[songNum] || songNum > queue.tracks.length || songNum < 0)
                return client.say.errorMessage(interaction, "無効な数値です。");
        
              song = queue.tracks[songNum]
            }
        
            const embed = new MessageEmbed()
              .setColor(interaction.guild.me.displayColor || "#00FFFF")
              .setTitle(`${song.title}`)
              .setURL(`${song.url}`)
              .setImage(`${song.thumbnail}`);
        
            if (song === queue.current) {
              embed.setAuthor(`現在再生中 🎶`)
                .setDescription(`~ 再生者 ${song.requestedBy.toString()}
        ${queue.createProgressBar()}`)
        .setImage(`${song.thumbnail}`);
            } else {
              embed.setAuthor("曲情報 🎵")
                .setDescription(`~ 再生者 ${song.requestedBy.toString()}
        長さ ${song.duration}
        再生待ちの順番 ${index}`);
            }
        
            return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);

        } else if (interaction.options.getSubcommand() === "jump") {

            const index = interaction.options.getNumber("index", true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "現在再生していません。");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return client.say.errorMessage(interaction, "再生待ちの曲がありません。");

    if (!index || index > queue.tracks.length || index < 1 || !queue.tracks[index])
      return client.say.errorMessage(interaction, "無効な数値です。");

    queue.jump(index);

    return client.say.infoMessage(interaction, `\`${index}\`に飛びました。`);
        } else if (interaction.options.getSubcommand() === "lyrics") {
            const songName = interaction.options.getString("query", true);

            const songNameFormated = songName
            .toLowerCase()
            .replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, "");

            try {
            const result = await lyricsClient.search(`${songNameFormated}`);

            if (!result || !result.lyrics)
                return client.say.errorMessage(interaction, "歌詞が見つかりませんでした。");

            const embed = client.say.baseEmbed(interaction)
                .setTitle(`${songName}`)
                .setDescription(`${result.lyrics.slice(0, 4090)}...`);

            return interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
            } catch {
            return client.say.errorMessage(interaction, "歌詞が見つかりませんでした。");
            }
        } else if (interaction.options.getSubcommand() === "loop") {
            const arg = interaction.options.getString("mode", false);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "現在再生していません。");

    if (!client.utils.canModifyQueue(interaction)) return;

    let md = "none";
    if (queue.repeatMode === 3) {
      md = "autoplay";
    } else if (queue.repeatMode == 2) {
      md = "queue";
    } else if (queue.repeatMode == 1) {
      md = "track";
    } else if (queue.repeatMode == 0) {
      md = "off";
    }

    const embed = client.say.rootEmbed(interaction)
      .setDescription(`ループモードを\`${md}\`に設定しました。`)
      .setFooter(`\'\/music loop <off|track|queue|autoplay>\'でループモードを変更できます。`);

    if (!arg)
      return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);

    let mode;
    switch (arg) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        mode = "ループを無効にしました。";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        mode = "この曲をループします。";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        mode = "再生待ちリストをループします。";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        mode = "オートプレイを有効化しました。";
        break;
      default:
        return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
    }

    return client.say.infoMessage(interaction, `${mode}`);

        } else if (interaction.options.getSubcommand() === "mute") {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
          return client.say.errorMessage(interaction, "現在再生していません。");
    
        if (!client.utils.canModifyQueue(interaction)) return;
    
        if (queue.volume === 0)
          return client.say.warnMessage(interaction, "既に消音されてます。");
    
        queue.mute();
        return client.say.infoMessage(interaction, "消音しました。");

        } else if (interaction.options.getSubcommand() === "move") {

            const fr = await interaction.options.getNumber("from", true);
    let to = await interaction.options.getNumber("to") ?? 1;
    to = to - 1;

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "現在再生していません。");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return client.say.warnMessage(interaction, "再生待ちの曲が3曲以上じゃなければシャッフルできません。");

    if (!fr || !to || fr < 0 || to < 0 || fr > queue.tracks.length || !queue.tracks[fr] || to > queue.tracks.length || !queue.tracks[to])
      return client.say.warnMessage(interaction, "無効な数値です。");

    if (fr === to)
      return client.say.warnMessage(interaction, "既にこの順番です。");

    const song = queue.tracks[fr];
    queue.splice(fr, 1);
    queue.splice(to, 0, song);

    return client.say.infoMessage(interaction, `**[${song.title}](${song.url})**を再生待ちの**position ${to}**番目に移動しました。`);
        } else if (interaction.options.getSubcommand() === "queue") {
            let page = interaction.options.getNumber("page", false) ?? 1;

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "現在再生していません。");

    if (!queue.tracks.length)
      return client.say.warnMessage(interaction, "再生待ちの曲がありません。");

    const multiple = 10;

    const maxPages = Math.ceil(queue.tracks.length / multiple);

    if (page < 1 || page > maxPages) page = 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.tracks.slice(start, end);

    const embed = client.say.rootEmbed(interaction)
      .setDescription(`${tracks.map((song, i) => `${start + (++i)} - [${song.title}](${song.url}) ~ [${song.requestedBy.toString()}]`).join("\n")}`)
      .setFooter(`ページ${page} / ${maxPages} | ${start + 1}から${end > queue.tracks.length ? `${queue.tracks.length}` : `${end}`}合計時間${queue.tracks.length}`, interaction.user.displayAvatarURL({ dynamic: true }));

    return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
        } else if (interaction.options.getSubcommand() === "remove") {
            const sNum = interaction.options.getNumber("index", true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "現在再生していません。");

    if (!client.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return client.say.warnMessage(interaction, "削除できる曲がありません。");

    const index = (sNum - 1);

    if (!index || index < 0 || index > queue.tracks.length || !queue.tracks[index])
      return client.say.warnMessage(interaction, "無効な数値です。");

    queue.remove(index);

    return client.say.infoMessage(interaction, `\`${sNum}\`を再生待ちから削除しました。`);
        
        } else if (interaction.options.getSubcommand() === "resume") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (!queue.connection.paused)
              return client.say.warnMessage(interaction, "一時停止されていません。");
        
            queue.setPaused(false);
            return client.say.infoMessage(interaction, "再生を再開しました。");
        } else if (interaction.options.getSubcommand() === "seek") {
            let timeString = interaction.options.getString("duration", true);

            const queue = client.player.getQueue(interaction.guild.id);
        
            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            const song = queue.current;
        
            if (song.live)
              return client.say.warnMessage(interaction, "ライブ配信ではこの操作ははできません。");
        
            if (isNaN(timeString) && !timeString.includes(":"))
              return client.say.errorMessage(interaction, "無効な数値です。");
        
            if (!isNaN(timeString)) timeString = `00:${timeString}`;
        
            const time = client.utils.toMilliSeconds(timeString);
        
            if (!time || isNaN(time) || time > song.durationMS || time < 0)
              return client.say.warnMessage(interaction, "無効な数値です。");
        
            queue.seek(time);
        
            return client.say.infoMessage(interaction, `Seeked to \`${timeString}\`.`);
        } else if (interaction.options.getSubcommand() === "shuffle") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (queue.tracks.length < 3)
              return client.say.warnMessage(interaction, "再生待ちの曲が3曲以上じゃなければシャッフルできません。");
        
            queue.shuffle();
        
            return client.say.infoMessage(interaction, "再生待ちをシャッフルしました。");
        } else if (interaction.options.getSubcommand() === "skip") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (queue.tracks.length < 1 && queue.repeatMode !== 3)
              return client.say.warnMessage(interaction, "飛ばす曲がありません。");
        
            queue.skip();
        
            return client.say.infoMessage(interaction, "次の曲に飛ばしました。");
        } else if (interaction.options.getSubcommand() === "stop") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            queue.stop();
        
            return client.say.infoMessage(interaction, "再生を停止しました。");
        } else if (interaction.options.getSubcommand() === "volume") {
            const newVol = interaction.options.getNumber("amount", false);

            const queue = client.player.getQueue(interaction.guild.id);
        
            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (!newVol) {
              const embed = client.say.rootEmbed(interaction)
                .setDescription(`現在の音量\`${queue.volume}%\``)
                .setFooter(`\'\/music volume <1-200>\'で調節できます。`);
        
              return interaction.editReply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
            }
        
            if (!Number.isInteger(newVol) || newVol > 200 || newVol < 0)
              return client.say.warnMessage(interaction, "無効な数値です。");
        
            queue.setVolume(newVol);
        
            return client.say.infoMessage(interaction, `音量を\`${queue.volume}%\`に設定しました。`);
        } else if (interaction.options.getSubcommand() === "unmute") {
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing)
              return client.say.errorMessage(interaction, "現在再生していません。");
        
            if (!client.utils.canModifyQueue(interaction)) return;
        
            if (queue.volume > 0)
              return client.say.warnMessage(interaction, "消音されていません。");
        
            queue.unmute();
            return client.say.infoMessage(interaction, "消音を解除しました。");
        }
    }
}