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

        const buildertexttosend = new TextInputBuilder()
            .setCustomId('buildertexttosend')
            .setLabel("Texto a mandar en el canal")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(2000);

        const firstActionRow = new ActionRowBuilder().addComponents(buildertexttosend);

        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
    }
}