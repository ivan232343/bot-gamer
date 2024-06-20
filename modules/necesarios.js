/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: PROY-0041-2024EXP-WIN Discord - Sprint2
 * fecha: 19/06/2024
 * motivo: 
 * Funcion para enviar mensajes de depuracion a un canal en especifico mediante webhook
 */

const { WebhookClient } = require("discord.js");
const { inspect } = require('util');
const { WEB_HOOCKS } = require("../configdiscord.json");
const WH_CHANNEL_LOG = new WebhookClient({ url: WEB_HOOCKS.ch_log_wh });
module.exports = {
    consoleLog: async function (text, err) {
        try {
            await WH_CHANNEL_LOG.send(`${text}\n${err ? "`\`\`\`" + inspect(err, { depth: 4, showHidden: true, maxArrayLength: 3, maxStringLength: 1800 }).slice(0, 2000) + "\`\`\`" : ""}`)

        } catch (error) {
            console.log(error)
        }
    },

}