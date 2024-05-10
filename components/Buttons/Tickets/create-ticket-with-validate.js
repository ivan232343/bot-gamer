const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, } = require('discord.js')
module.exports = {
    data: { name: 'create-ticket-with-validate' },
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal-input-gamer-with-validate')
            .setTitle('Genera tu ticket de atencion');
        const nombreCliente = new TextInputBuilder()
            .setCustomId('namecliente')
            .setLabel('Ingrese el nombre del titular')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        const dnicliente = new TextInputBuilder()
            .setCustomId('dnicliente')
            .setLabel("Documento de identidad del titular")
            .setRequired(true)
            .setMinLength(8)
            .setMaxLength(15)
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(dnicliente);
        const secondActionRow = new ActionRowBuilder().addComponents(nombreCliente);

        modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal);
    }
}