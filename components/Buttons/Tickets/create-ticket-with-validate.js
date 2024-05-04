const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, } = require('discord.js')
module.exports = {
    data: {
        name: 'create-ticket-with-validate'
    },
    async execute(interaction) {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('modal-input-gamer-with-validate')
            .setTitle('Genera tu ticket de atencion');
        const nombreCliente = new TextInputBuilder()
            .setCustomId('namecliente')
            .setLabel('Ingrese el nombre del titular')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        // Create the text input components
        const dnicliente = new TextInputBuilder()
            .setCustomId('dnicliente')
            // The label is the prompt the user sees for this input
            .setLabel("Documento de identidad del titular")
            .setRequired(true)
            .setMinLength(8)
            .setMaxLength(15)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(dnicliente);
        const secondActionRow = new ActionRowBuilder().addComponents(nombreCliente);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);
        // await interaction.reply({ content: 'Hola Cliente' })
    }
}