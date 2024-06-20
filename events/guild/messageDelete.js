/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: PROY-0041-2024EXP-WIN Discord - Sprint2 
 * fecha: 19/06/2024
 * motivo: 
 * Envia un mensaje al canal cuando un mensaje fue eliminado
 */
const { Events } = require("discord.js");
module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        // Verifica si el mensaje está en una categoría específica
        if (message.channel.parent && message.channel.parent.name === '<-- 𝙏𝙄𝘾𝙆𝙀𝙏𝙎 --------------------->') {
            message.channel.send("Se elimino un mensaje...")
        }

    }
}