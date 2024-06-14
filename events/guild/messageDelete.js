const { Events, AttachmentBuilder } = require("discord.js");


module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        // Verifica si el mensaje está en una categoría específica
        if (message.channel.parent && message.channel.parent.name === '<-- 𝙏𝙄𝘾𝙆𝙀𝙏𝙎 --------------------->') {
            message.channel.send("Se elimino un mensaje, nunca sabremos que mensaje fue :C")
        }

    }
}