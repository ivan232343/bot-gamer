const { Events, ActivityType } = require("discord.js");
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log('Guilds (servidores) en los que está el bot:');
    client.guilds.cache.forEach(async (guild) => await console.log(`- ${guild.name} (ID: ${guild.id})`));
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.user.setPresence({
      activities: [{ name: "jugando con los planes gamer", type: ActivityType.Custom }],
    })
  },
};
