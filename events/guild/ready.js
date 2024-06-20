/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * evento que gestiona que hara el bot al momento de iniciarse o prenderse
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se añadio la funcion consoleLog() para gestionar errores y/o registros en el mismo discord
const { Events, ActivityType } = require("discord.js");
const { consoleLog } = require("../../modules/necesarios");
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    consoleLog('Guilds (servidores) en los que está el bot:');
    client.guilds.cache.forEach(async (guild) => await consoleLog(`- ${guild.name} (ID: ${guild.id})`));
    consoleLog(`Ready! Logged in as ${client.user.tag}`);

    client.user.setPresence({
      activities: [{ name: "con los planes gamer", type: ActivityType.Playing }],
    })
  },
};
