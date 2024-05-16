/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * evento que gestiona que hara el bot al momento de iniciarse o prenderse
 */

const { Events, ActivityType } = require("discord.js");
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log('Guilds (servidores) en los que está el bot:');
    client.guilds.cache.forEach(async (guild) => await console.log(`- ${guild.name} (ID: ${guild.id})`));
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.user.setPresence({
      activities: [{ name: "con los planes gamer", type: ActivityType.Playing }],
    })
  },
};
