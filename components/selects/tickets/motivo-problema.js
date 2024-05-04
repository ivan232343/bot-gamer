const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const { categoria } = require('../../../json/motivos.json');
const { toUTC } = require('../../../modules/utclocalconverter');
const { sp_validate_tktpendiente } = require('../../../modules/peticionesbd');
module.exports = {
    data: {
        name: 'motivo-problema'
    },
    async execute(interaction) {
        const dni = interaction.customId.split("_")[1];
        const pendiente = await sp_validate_tktpendiente(dni)
        if (!pendiente.find) {
            const tipoProblema = categoria[interaction.values[0]].Label;
            const modal = new ModalBuilder()
                .setCustomId(`modal-problema_${dni}_${tipoProblema}`)
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
        } else {
            const fechaApertura = toUTC(pendiente.f.InitTimeCreation)
            const creadoApertura = `${(fechaApertura.getUTCDate()).toString().padStart(2, '0')}/${(fechaApertura.getUTCMonth() + 1).toString().padStart(2, '0')}/${fechaApertura.getFullYear()} ${(fechaApertura.getUTCHours()).toString().padStart(2, '0')}:${(fechaApertura.getUTCMinutes()).toString().padStart(2, '0')}:${(fechaApertura.getUTCSeconds()).toString().padStart(2, '0')}`
            const fechaAtencion = pendiente.f.InitTimeAtention !== null ? toUTC(pendiente.f.InitTimeAtention) : ""
            const creadoAtencion = fechaAtencion !== "" ? `${(fechaAtencion.getUTCDate()).toString().padStart(2, '0')}/${(fechaAtencion.getUTCMonth() + 1).toString().padStart(2, '0')}/${fechaAtencion.getFullYear()} ${(fechaAtencion.getUTCHours()).toString().padStart(2, '0')}:${(fechaAtencion.getUTCMinutes()).toString().padStart(2, '0')}:${(fechaAtencion.getUTCSeconds()).toString().padStart(2, '0')}` : ""
            await interaction.reply({
                content: `Se valida ticket pendiente en <#${pendiente.f.channelId}> creado el  ${creadoApertura}\n${pendiente.f.asesorInitAtencion !== null ? `Siendo atendido por <@${pendiente.f.asesorInitAtencion}> desde ${creadoAtencion} ` : ""}`,
                ephemeral: true
            })

        }
    }
}