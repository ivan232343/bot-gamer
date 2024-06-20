/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * despues de valida la identidad del usuario, se procede con el tipo de consulta,
 * por lo que despues de seleccionar el motivo de consulta, se validara(por segunda vez) si ya hay una 
 * atencion en curso dependiendo a ello se estaria procediendo con el siguiente paso
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se optimizo codigo colocando una funcion en pasos redundantes/se realizo correcciones gramaticales, solicitados por experiencia
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const { CATEGORIA } = require('../../../json/motivos.json');
const { consoleLog } = require('../../../modules/necesarios');
const { validarTicketPendiente } = require('../../../modules/funcionalidades');
module.exports = {
    data: { name: 'motivo-problema-with-validate' },
    async execute(interaction) {
        const GET_DATA = interaction.customId.split("_")
        const DATA_RES = { dni: GET_DATA[1], servicio: GET_DATA[3], categoriaPicked: CATEGORIA[interaction.values[0]].value }
        const CHECK_PENDIENTE = await validarTicketPendiente(DATA_RES.dni)
        consoleLog("validar pendiente:", CHECK_PENDIENTE)
        if (CHECK_PENDIENTE.find) return await interaction.reply(CHECK_PENDIENTE.data)
        const MODAL = new ModalBuilder()
            .setCustomId(`modal-problema_${DATA_RES.dni}_${DATA_RES.categoriaPicked}_${DATA_RES.servicio}`)
            .setTitle('¿Cómo te ayudamos?');
        const DETALLES_PROBLEMA = new TextInputBuilder()
            .setCustomId('resumenProblema')
            .setLabel("Escríbenos tu solicitud.")
            .setMinLength(15)
            .setMaxLength(450)
            .setStyle(TextInputStyle.Paragraph);

        const PRIMERA_FILA = new ActionRowBuilder().addComponents(DETALLES_PROBLEMA);
        MODAL.addComponents(PRIMERA_FILA);
        await interaction.showModal(MODAL)

    }
}