/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Envia un mensaje con el usuario del bot, usado para enviar notificaciones noticias o algun comunicado,
 * usado por el comando `/text`
 */
module.exports = {
    data: { name: 'modal-build-text' },
    async execute(interaction) {
        const TEXT_TO_SEND = interaction.fields.getTextInputValue("buildertexttosend");
        await interaction.channel.send({
            content: TEXT_TO_SEND
        }).then(async () => {
            await interaction.reply({ content: "Enviado exitosamente", ephemeral: true })
        })
    }
}