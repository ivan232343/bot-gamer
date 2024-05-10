const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, } = require('discord.js')
module.exports = {
    data: { name: 'validation' },
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('modal-validate-gamer')
            .setTitle('Registro de cliente');

        const dnicliente = new TextInputBuilder()
            .setCustomId('dnicliente')
            .setLabel("Documento de identidad del titular")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMinLength(8)
            .setMaxLength(11);

        const firstActionRow = new ActionRowBuilder().addComponents(dnicliente);

        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
    }
}