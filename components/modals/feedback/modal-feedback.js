/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: PROY-0041-2024EXP-WIN Discord - Sprint2
 * fecha: 19/06/2024
 * motivo: 
 * Recibe los comentarios de mejora y los envia a un canal por medio de un webhoock
 */

const { WEB_HOOCKS } = require("../../../configdiscord.json");
const { WebhookClient } = require("discord.js");
const WH_SEND_FEEDBACK = new WebhookClient({ url: WEB_HOOCKS.ch_feedback });
module.exports = {
    data: { name: 'modal-feedback' },
    async execute(interaction) {
        const DNI_CLIENTE = interaction.fields.getTextInputValue("dnicliente");
        const COMENTARIOS = interaction.fields.getTextInputValue("recofeedback");
        const NOMBRE_CLIENTE = interaction.fields.getTextInputValue("nombrecliente");

        await WH_SEND_FEEDBACK.send(`# ${interaction.user} hizo un comentario\n- Con el documento *${DNI_CLIENTE}* / *_${NOMBRE_CLIENTE}_*\n\`\`\`${COMENTARIOS}\`\`\``)
        return await interaction.reply({
            content: `Muchas gracias por tus comentarios ${interaction.user}, lo tomaremos en cuenta para seguir mejorando y darte una mejor experiencia.`,
            ephemeral: true
        })
    }
}