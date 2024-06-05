/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Boton que gestiona el asignamiento de tickets, el usuario(asesor) al presionarlo actualiza la info
 * del ticket con la fecha que fue tomada por el asesor, el interaction id del asesor,
 * y el estado de la atencion
 */
const { asesor } = require('../../../json/roles.json');
const { sp_update_ticket_atention } = require("../../../modules/peticionesbd");

module.exports = {
    data: { name: 'catch-ticket' },
    async execute(interaction, client) {
        const CUSTOM_ID = interaction.customId.split("_")
        const DATA_INFO = { dni: CUSTOM_ID[1], currentID: CUSTOM_ID[2], idChannel: CUSTOM_ID[3], interaction: interaction.user.id };
        const UPDATE_BD = await sp_update_ticket_atention({ interaction: DATA_INFO.interaction, currentid: DATA_INFO.currentID })
        const CHANNEL_DATA = client.channels.cache.get(DATA_INFO.idChannel)
        if (UPDATE_BD.execute) {
            await CHANNEL_DATA.permissionOverwrites.create(asesor, {
                SendMessages: false,
                ViewChannel: false,
                ReadMessageHistory: false
            })
            await CHANNEL_DATA.permissionOverwrites.create(interaction.user.id, {
                SendMessages: true,
                ViewChannel: true,
                ReadMessageHistory: true,
                UseApplicationCommands: true
            })
            await CHANNEL_DATA.send({ content: `Seras atendido por: <@${interaction.user.id}>` })
            await interaction.update({ content: `Ticket tomado por <@${interaction.user.id}>`, components: [] })
        } else {
            await interaction.reply({ content: `${interaction.user} -> ${UPDATE_BD.msg}`, ephemeral: true })
        }

    }
}