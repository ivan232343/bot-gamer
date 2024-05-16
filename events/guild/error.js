/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Envia un mensaje en forma de "embed" al canal #errores-del-bot indicando que 
 * error se presento para una mayor deteccion del problema
 */
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { inspect } = require('util');
const { ch_webhook, url_utiles } = require("../../json/recursos.json")
const webhook = new WebhookClient({ url: ch_webhook });
module.exports = {
    name: "error",
    async execute(err) {
        console.log(err)
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Discord API error")
            .setURL(url_utiles.discordjs_error)
            .setDescription(`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();
        return webhook.send({ embeds: [embed] })
    }
}