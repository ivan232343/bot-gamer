const { PermissionFlagsBits, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const transcripts = require("discord-html-transcripts");
const { bkChats } = require("../../../json/canales.json");
const { staff } = require('../../../json/roles.json')
module.exports = {
    data: {
        name: 'close-ticket'
    },
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has(staff)) return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });
        console.log()
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('cerrar-ticket_' + interaction.customId.split("_")[1])
            .setTitle('Cierra con el ticket de atencion');

        // Create the text input components
        const idRegistroInput = new TextInputBuilder()
            .setCustomId('idregistro')
            // The label is the prompt the user sees for this input
            .setLabel("Ticket de atencion (AT-xxxxxxxx)")
            .setRequired(true)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(idRegistroInput);
        // const secondActionRow = new ActionRowBuilder().addComponents(resumenProblema);

        // Add inputs to the modal
        modal.addComponents(firstActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);
        // await interaction.reply({ content: 'Hola Cliente' })
    }
}