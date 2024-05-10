const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const { categoria } = require('../../../json/motivos.json');
const { toUTC } = require('../../../modules/utclocalconverter');
const { sp_validate_tktpendiente } = require('../../../modules/peticionesbd');
module.exports = {
    data: {
        name: 'motivo-problema-with-validate'
    },
    async execute(interaction) {
        const ret = interaction.customId.split("_")
        const data = { dni: ret[1], name: ret[2], servicio: ret[3], categoriaPicked: categoria[interaction.values[0]].Label }
        const pendiente = await sp_validate_tktpendiente(data.dni)
        if (!pendiente.find) {
            const modal = new ModalBuilder()
                .setCustomId(`modal-problema_${data.dni}_${data.categoriaPicked}_${data.servicio}_${data.name}`)
                .setTitle('¿Problema o consulta?');
            const resumenProblema = new TextInputBuilder()
                .setCustomId('resumenProblema')
                .setLabel("Describa su problema")
                .setMinLength(15)
                .setMaxLength(450)
                .setStyle(TextInputStyle.Paragraph);

            const secondActionRow = new ActionRowBuilder().addComponents(resumenProblema);
            modal.addComponents(/*firstActionRow,*/ secondActionRow);
            await interaction.showModal(modal)
        } else {
            const fechaApertura = toUTC(pendiente.f.time_create)
            const creadoApertura = `${(fechaApertura.getUTCDate()).toString().padStart(2, '0')}/${(fechaApertura.getUTCMonth() + 1).toString().padStart(2, '0')}/${fechaApertura.getFullYear()} ${(fechaApertura.getUTCHours()).toString().padStart(2, '0')}:${(fechaApertura.getUTCMinutes()).toString().padStart(2, '0')}:${(fechaApertura.getUTCSeconds()).toString().padStart(2, '0')}`
            const fechaAtencion = pendiente.f.time_init !== null ? toUTC(pendiente.f.time_init) : ""
            const creadoAtencion = fechaAtencion !== "" ? `${(fechaAtencion.getUTCDate()).toString().padStart(2, '0')}/${(fechaAtencion.getUTCMonth() + 1).toString().padStart(2, '0')}/${fechaAtencion.getFullYear()} ${(fechaAtencion.getUTCHours()).toString().padStart(2, '0')}:${(fechaAtencion.getUTCMinutes()).toString().padStart(2, '0')}:${(fechaAtencion.getUTCSeconds()).toString().padStart(2, '0')}` : ""
            await interaction.reply({
                content: `Se valida ticket pendiente en <#${pendiente.f.channel_id}> creado el  ${creadoApertura}\n${pendiente.f['adviser_i-id_init'] !== null ? `Siendo atendido por <@${pendiente.f['adviser_i-id_init']}> desde ${creadoAtencion} ` : ""}`,
                ephemeral: true
            })

        }
    }
}