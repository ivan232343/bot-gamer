const { CH_FEEDBACK } = require("../../../json/recursos.json");
const { WebhookClient } = require("discord.js");
const webhook = new WebhookClient({ url: CH_FEEDBACK });
module.exports = {
    data: { name: 'modal-feedback' },
    async execute(interaction) {
        const DNI_CLIENTE = interaction.fields.getTextInputValue("dnicliente");
        const COMENTARIOS = interaction.fields.getTextInputValue("recofeedback");
        const NOMBRE_CLIENTE = interaction.fields.getTextInputValue("nombrecliente");

        await webhook.send(`# ${interaction.user} hizo un comentario\n- Con el documento *${DNI_CLIENTE}* / *_${NOMBRE_CLIENTE}_*\n\`\`\`${COMENTARIOS}\`\`\``)
        return await interaction.reply({
            content: `Muchas gracias por tus comentarios ${interaction.user}, lo tomaremos en cuenta para seguir mejorando y darte una mejor experiencia.`,
            ephemeral: true
        })
    }
}