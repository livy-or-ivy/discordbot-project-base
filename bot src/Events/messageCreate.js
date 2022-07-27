const Discord = require("discord.js")
const { Permissions } = require('discord.js');

const prefix = "your bot prefix"

exports.run = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    if (comando.length === 0) return;

    const executeCommand = client.cmds.get(comando) || client.cmds.find(cmd => cmd.aliases && cmd.aliases.includes(comando));
    if (executeCommand) {
        const getCommandName = client.cmds.get(comando)
        if (!getCommandName) {
            const getCommandAliases = client.cmds.find(cmd => cmd.aliases && cmd.aliases.includes(comando))
            if (getCommandAliases) { commandName = getCommandAliases.name }
        } else {
            commandName = comando
        }

        executeCommand.run(client, message, args);
    }
}