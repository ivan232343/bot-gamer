/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Envia un mensaje en forma de "embed" al canal #errores-del-bot indicando que 
 * error se presento para una mayor deteccion del problema
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables / se corrigio la url del webhook
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { inspect } = require('util');
const { URL_UTILES } = require("../../json/recursos.json")
const { WEB_HOOCKS } = require("../../configdiscord.json")
const WH_CH_ERRORS = new WebhookClient({ url: WEB_HOOCKS.ch_errors });
module.exports = {
    name: "error",
    async execute(err) {
        console.log(err)
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Discord API error")
            .setURL(URL_UTILES.discordjs_error)
            .setDescription(`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();
        return WH_CH_ERRORS.send({ embeds: [embed] })
    }
}