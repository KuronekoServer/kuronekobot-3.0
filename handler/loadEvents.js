const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const menuEvents = (event) => require(`../events/interactions/menus/${event}`)
const otherEvent = (event) => require(`../events/functions/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
  const cooldowns = new Discord.Collection();

  // client events
  client.on("ready", () => clientEvent("ready")(client));
  client.on("messageCreate", (m) => clientEvent("mention")(m, client));

  // guild events
  client.on('interactionCreate', (m) => guildEvent("interactionCreate")(m, client));
  client.on("messageCreate", (m) => guildEvent("command")(m, cooldowns));

  // Menu Events
  client.on('interactionCreate', (m) => menuEvents("help")(m, client));

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}

module.exports = {
  loadEvents,
};
