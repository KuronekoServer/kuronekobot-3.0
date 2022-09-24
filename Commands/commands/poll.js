module.exports = {
    name: "poll",
    description: "投票を作る",
    botPerms: ["EMBED_LINKS"],
    run: async (_, message, args) => {
        const [title, ...choices] = args;
        if (!title) return message.channel.send({ content: 'タイトルを指定してください' });
        const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹'];
        if (choices.length < 2 || choices.length > emojis.length)
            return message.channel.send({ content: `選択肢は最低2つ最大${emojis.length}個の範囲内で指定してください` });
        const poll = await message.channel.send({
            embeds: [
                {
                    title: title,
                    description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
                }
            ]
        });
        emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji));
    },
};
