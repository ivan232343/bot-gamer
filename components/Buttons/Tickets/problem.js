const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
// const { SelectMotivo } = require('../../modules/builder')
module.exports = {
    data: {
        name: "problem"
    },
    async execute(interaction, client) {
        // const name = interaction.customId.split("_")[2];
        const dni = interaction.customId.split("_")[1];
        const modal = new ModalBuilder()
            .setCustomId(`modal-problema_${dni}`)
            .setTitle('¿Problema o consulta?');
        const resumenProblema = new TextInputBuilder()
            .setCustomId('resumenProblema')
            .setLabel("Describa su problema")
            .setMinLength(15)
            .setMaxLength(450)
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph);

        // const firstActionRow = new ActionRowBuilder().addComponents(motivo);

        const secondActionRow = new ActionRowBuilder().addComponents(resumenProblema);
        // Add inputs to the modal
        modal.addComponents(/*firstActionRow,*/ secondActionRow);
        // Show the modal to the user
        await interaction.showModal(modal)
    }
}