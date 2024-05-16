/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Si ocurre un error de promesas se envia un mensaje al canal #errores-del-bot par anotificarlo
 */
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { ch_webhook, url_utiles } = require("../../json/recursos.json")
const { inspect } = require('util');
const webhook = new WebhookClient({ url: ch_webhook });

module.exports = {
    name: "unhandledRejection",
    async execute(reason, promise) {
        const embed = new EmbedBuilder()
            .setTitle("Unhandled Rejection/catch")
            .setURL(`${url_utiles.nodejs_error}event-unhandledrejection`)
            .addFields({
                name: "Reason",
                value: `\`\`\`${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``
            }, {
                name: "Promise",
                value: `\`\`\`${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``
            })
            .setTimestamp()
        return webhook.send({ embeds: [embed] })
    }
} 