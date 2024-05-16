/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Si ocurre un error como funciones o variables inexistentes se envia un mensaje al canal #errores-del-bot par anotificarlo
 */
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const { ch_webhook, url_utiles } = require("../../json/recursos.json")
const webhook = new WebhookClient({ url: ch_webhook });

module.exports = {
    name: "uncaughtExceptionMonitor",
    async execute(err, origin) {
        const embed = new EmbedBuilder()
            .setTitle("Uncaught Exception Monitor")
            .setURL(`${url_utiles.nodejs_error}event-uncaughtExceptionmonitor`)
            .addFields({
                name: "Error",
                value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``
            }, {
                name: "Origin",
                value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``
            })
            .setTimestamp()
        return webhook.send({ embeds: [embed] })

    }
}