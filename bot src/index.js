const Discord = require("discord.js");
const { Collection } = require("discord.js");

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
})

const { readdir, lstatSync } = require("fs");
const fs = require("fs");

client.cmds = new Collection();
client.aliases = new Collection();
client.aliases = new Collection();

fs.readdirSync('./Commands').forEach(dirs => {
    const commands = fs.readdirSync(`./Commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const props = require(`./Commands/${dirs}/${file}`);
        client.cmds.set(props.config.name, {
            run: props.run,
            ...props.config
        });
    }
});

fs.readdir("./Events", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        let eventFunction = require("./Events/" + file);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    })
})

client.login('your bot token')