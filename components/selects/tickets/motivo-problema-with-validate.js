/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * despues de valida la identidad del usuario, se procede con el tipo de consulta,
 * por lo que despues de seleccionar el motivo de consulta, se validara(por segunda vez) si ya hay una 
 * atencion en curso dependiendo a ello se estaria procediendo con el siguiente paso
 */
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const { categoria } = require('../../../json/motivos.json');
const { toUTC } = require('../../../modules/utclocalconverter');
const { sp_validate_tktpendiente } = require('../../../modules/peticionesbd');
module.exports = {
    data: { name: 'motivo-problema-with-validate' },
    async execute(interaction) {
        const GET_DATA = interaction.customId.split("_")
        const DATA_RES = { dni: GET_DATA[1], name: GET_DATA[2], servicio: GET_DATA[3], categoriaPicked: categoria[interaction.values[0]].Label }
        const CHECK_PENDIENTE = await sp_validate_tktpendiente(DATA_RES.dni)
        if (!CHECK_PENDIENTE.find) {
            const MODAL = new ModalBuilder()
                .setCustomId(`modal-problema_${DATA_RES.dni}_${DATA_RES.categoriaPicked}_${DATA_RES.servicio}_${DATA_RES.name}`)
                .setTitle('¿Problema o consulta?');
            const DETALLES_PROBLEMA = new TextInputBuilder()
                .setCustomId('resumenProblema')
                .setLabel("Describa su problema")
                .setMinLength(15)
                .setMaxLength(450)
                .setStyle(TextInputStyle.Paragraph);

            const PRIMERA_FILA = new ActionRowBuilder().addComponents(DETALLES_PROBLEMA);
            MODAL.addComponents(PRIMERA_FILA);
            await interaction.showModal(MODAL)
        } else {
            const FECHA_APERTURA = toUTC(CHECK_PENDIENTE.f.time_create)
            const STR_APERTURA = `${(FECHA_APERTURA.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_APERTURA.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_APERTURA.getFullYear()} ${(FECHA_APERTURA.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCSeconds()).toString().padStart(2, '0')}`
            const FECHA_ATENCION = CHECK_PENDIENTE.f.time_init !== null ? toUTC(CHECK_PENDIENTE.f.time_init) : ""
            const STR_CREADO = FECHA_ATENCION !== "" ? `${(FECHA_ATENCION.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_ATENCION.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_ATENCION.getFullYear()} ${(FECHA_ATENCION.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCSeconds()).toString().padStart(2, '0')}` : ""
            await interaction.reply({
                content: `Se valida ticket pendiente en <#${CHECK_PENDIENTE.f.channel_id}> creado el  ${STR_APERTURA}\n${CHECK_PENDIENTE.f['adviser_i-id_init'] !== null ? `Siendo atendido por <@${CHECK_PENDIENTE.f['adviser_i-id_init']}> desde ${STR_CREADO} ` : ""}`,
                ephemeral: true
            })

        }
    }
}