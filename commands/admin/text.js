/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * comando para que el texto que envies, se envie como si fuera el bot 
 */
const { SlashCommandBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("text")
        .setDescription("Envia un mensaje como si fueras un bot.")
    ,
    category: "admin",
    async execute(interaction) {
        const MODAL = new ModalBuilder()
            .setCustomId('modal-build-text')
            .setTitle('Texto a formar');

        const BUILDER_TO_TEXT = new TextInputBuilder()
            .setCustomId('buildertexttosend')
            .setLabel("Texto a mandar en el canal")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(2000);
        const PRIMERA_FILA = new ActionRowBuilder().addComponents(BUILDER_TO_TEXT);
        MODAL.addComponents(PRIMERA_FILA);
        await interaction.showModal(MODAL);
    }
}