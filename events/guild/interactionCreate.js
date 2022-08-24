module.exports = async(interaction, client) => {
    const { OwnerID } = require('../../config.json')
    const blacklist = require('../../database/blacklist');
    const gblacklist = require('../../database/guild-blacklist');

    if (!interaction.isCommand()) return;

        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an error occured siu4' });

        if (command.ownerOnly) {
            if (!interaction.member.user.id == OwnerID) {
                return interaction.reply('Command under developement!')
            }
        }
        let blacklist1 = await blacklist.findOne({ id: interaction.member.user.id })
        if (blacklist1) return interaction.reply(
          `:warning: | **You have been blacklisted** \n**You will be unable to use MikanBot or any of its features until your blacklist is lifted.**\n\n Contact the devs to contest your blacklist here: https://discord.gg/4gfEnY83nx`
        );
        let blacklist2 = await gblacklist.findOne({ id: interaction.member.user.id })
        if (blacklist2) return interaction.reply(
          `:warning: | **This guild has been Blacklisted** \n**You will be unable to use MikanBot or any of its features here until this guilds blacklist is lifted.**\n(Don't worry, you will still be able to use the bot in other servers unless you have been user blacklisted.)\n\n Server owners/moderators may contact the devs to contest the blacklist here: https://discord.gg/4gfEnY83nx`
        );

        if (command.userPerms) {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has(command.userPerms || [])) {
                if (command.noUserPermsMessage) {
                    return interaction.reply(command.noUserPermsMessage)
                } else if (!command.noUserPermsMessage) {
                    return interaction.reply(`You need the \`${command.userPerms}\` permission to use this command!`)
                }
            }
        }

        if (command.botPerms) {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(client.user.id).permissions.has(command.botPerms || [])) {
                if (command.noBotPermsMessage) {
                    return interaction.reply(command.noBotPermsMessage)
                } else if (!command.noBotPermsMessage) {
                    return interaction.reply(`I need the \`${command.userPerms}\` permission to execute this command!`)
                }
            }
        } 

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x =>  {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        try {

            command.run(client, interaction, args)
        } catch (e) {
            interaction.reply({ content: e.message });
        }
        
    }