const { PermissionFlagsBits, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { staff } = require('../../../json/roles.json')
module.exports = {
    data: { name: 'close-ticket' },
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has(staff))
            return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });

        const modal = new ModalBuilder()
            .setCustomId('cerrar-ticket_' + interaction.customId.split("_")[1])
            .setTitle('Cierra con el ticket de atencion');

        const idRegistroInput = new TextInputBuilder()
            .setCustomId('idregistro')
            .setLabel("Ticket de atencion (AT-xxxxxxxx)")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);
        const firstActionRow = new ActionRowBuilder().addComponents(idRegistroInput);

        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
    }
}