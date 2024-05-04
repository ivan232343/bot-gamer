const { SlashCommandBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("text")
        .setDescription("Envia un mensaje como si fueras un bot.")
    ,
    category: "admin",
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal-build-text')
            .setTitle('Texto a formar');

        // Create the text input components
        const buildertexttosend = new TextInputBuilder()
            .setCustomId('buildertexttosend')
            // The label is the prompt the user sees for this input
            .setLabel("Texto a mandar en el canal")
            .setRequired(true)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(2000)
            ;

        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(buildertexttosend);
        // const secondActionRow = new ActionRowBuilder().addComponents(resumenProblema);

        // Add inputs to the modal
        modal.addComponents(firstActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);
        // await interaction.reply({ content: 'Hola Cliente' })
    }
}