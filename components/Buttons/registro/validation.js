const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, } = require('discord.js')
module.exports = {
    data: {
        name: 'validation'
    },
    async execute(interaction) {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('modal-validate-gamer')
            .setTitle('Registro de cliente');

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

        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(dnicliente);
        // const secondActionRow = new ActionRowBuilder().addComponents(resumenProblema);

        // Add inputs to the modal
        modal.addComponents(firstActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);
        // await interaction.reply({ content: 'Hola Cliente' })
    }
}