/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Si ocurre un error menor se envia un mensaje al canal #errores-del-bot par anotificarlo
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 correccion de variables
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const { URL_UTILES } = require("../../json/recursos.json")
const { WEB_HOOCKS } = require("../../configdiscord.json")
const WH_CHANNEL_ERRORS = new WebhookClient({ url: WEB_HOOCKS.ch_errors });
module.exports = {
    name: "warning",
    async execute(warn) {
        const EMBED = new EmbedBuilder()
            .setTitle("Uncaught Exception Monitor Warning")
            .setURL(`${URL_UTILES}event-warning`)
            .addFields({
                name: "Warn",
                value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\``
            })
            .setTimestamp()
        return WH_CHANNEL_ERRORS.send({ embeds: [EMBED] })
    }
}