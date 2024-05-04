const { TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: {
        name: 'initfeedback'
    },
    async execute(interaction) {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('modal-feedback')
            .setTitle('Ayudanos a mejorar');

        // Create the text input components
        const dnicliente = new TextInputBuilder()
            .setCustomId('dnicliente')
            // The label is the prompt the user sees for this input
            .setLabel("Documento de identidad del titular")
            .setRequired(true)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setMinLength(8)
            .setMaxLength(11)
            ;
        const recomendacion = new TextInputBuilder()
            .setCustomId('recofeedback')
            // The label is the prompt the user sees for this input
            .setLabel("Comentarios de mejora")
            .setRequired(true)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(8)
            .setMaxLength(5000)

            ;

        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(dnicliente);
        const secondActionRow = new ActionRowBuilder().addComponents(recomendacion);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);
        // await interaction.reply({ content: 'Hola Cliente' })
    }
}