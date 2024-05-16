/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Estructura del modal para el boton de initfeedback.
 * aun en desarrollo
 */
const { TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: { name: 'initfeedback' },
    async execute(interaction) {
        const MODAL = new ModalBuilder()
            .setCustomId('modal-feedback')
            .setTitle('Ayudanos a mejorar');

        const DNI_CLIENTE_INPT = new TextInputBuilder()
            .setCustomId('dnicliente')
            .setLabel("Documento de identidad del titular")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMinLength(8)
            .setMaxLength(11);
        const RECOMENDACION_INPT = new TextInputBuilder()
            .setCustomId('recofeedback')
            .setLabel("Comentarios de mejora")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(8)
            .setMaxLength(5000);

        const PRIMERA_FILA = new ActionRowBuilder().addComponents(DNI_CLIENTE_INPT);
        const SEGUNDA_FILA = new ActionRowBuilder().addComponents(RECOMENDACION_INPT);

        MODAL.addComponents(PRIMERA_FILA, SEGUNDA_FILA);
        await interaction.showModal(MODAL);
    }
}