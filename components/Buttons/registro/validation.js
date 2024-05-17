/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Inicia un modal para que el usuario pueda colocar sus datos para la validacion 
 * y pueda acceder al contenido del servidor
 */
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, } = require('discord.js')
module.exports = {
    data: { name: 'validation' },
    async execute(interaction) {

        const MODAL = new ModalBuilder()
            .setCustomId('modal-validate-gamer')
            .setTitle('Registro de cliente');

        const NOMBRE_CLIENTE = new TextInputBuilder()
            .setCustomId('namecliente')
            .setLabel('Ingrese el nombre del titular')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        const DNI_CLIENTE = new TextInputBuilder()
            .setCustomId('dnicliente')
            .setLabel("Documento de identidad del titular")
            .setRequired(true)
            .setMinLength(8)
            .setMaxLength(15)
            .setStyle(TextInputStyle.Short);

        const PRIMERA_FILA = new ActionRowBuilder().addComponents(DNI_CLIENTE);
        const SEGUNDA_FILA = new ActionRowBuilder().addComponents(NOMBRE_CLIENTE);

        MODAL.addComponents(PRIMERA_FILA, SEGUNDA_FILA);
        await interaction.showModal(MODAL);
    }
}