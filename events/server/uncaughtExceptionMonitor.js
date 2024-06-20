/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Si ocurre un error como funciones o variables inexistentes se envia un mensaje al canal #errores-del-bot par anotificarlo
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 correccion de variables
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const { URL_UTILES } = require("../../json/recursos.json")
const { WEB_HOOCKS } = require("../../configdiscord.json")
const WH_CHANNEL_ERRORS = new WebhookClient({ url: WEB_HOOCKS.ch_errors });
module.exports = {
    name: "uncaughtExceptionMonitor",
    async execute(err, origin) {
        const embed = new EmbedBuilder()
            .setTitle("Uncaught Exception Monitor")
            .setURL(`${URL_UTILES.nodejs_error}event-uncaughtExceptionmonitor`)
            .addFields({
                name: "Error",
                value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``
            }, {
                name: "Origin",
                value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``
            })
            .setTimestamp()
        return WH_CHANNEL_ERRORS.send({ embeds: [embed] })

    }
}