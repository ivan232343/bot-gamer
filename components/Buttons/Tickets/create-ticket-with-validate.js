/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Boton inicia un modal para comenzar con la creacion del canal para la atencion
 * solitando el nombre completo del titular y su dni como parte de la validacion
 */
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
module.exports = {
    data: { name: 'create-ticket-with-validate' },
    async execute(interaction) {
        const MODAL = new ModalBuilder()
            .setCustomId('modal-input-gamer-with-validate')
            .setTitle('Genera tu ticket de atencion');
        const NOMBRE_CLIENTE = new TextInputBuilder()
            .setCustomId('namecliente')
            .setLabel('Ingrese el nombre completo del titular')
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