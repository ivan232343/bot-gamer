/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Boton que gestiona el asignamiento de tickets, el usuario(asesor) al presionarlo actualiza la info
 * del ticket con la fecha que fue tomada por el asesor, el interaction id del asesor,
 * y el estado de la atencion
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables
const { ROLES } = require('../../../configdiscord.json');
const { consoleLog } = require('../../../modules/necesarios');
const { spUpdateAtencionTicket } = require("../../../modules/peticionesbd");

module.exports = {
    data: { name: 'catch-ticket' },
    async execute(interaction, client) {
        const CUSTOM_ID = interaction.customId.split("_")
        const DATA_INFO = { dni: CUSTOM_ID[1], currentID: CUSTOM_ID[2], idChannel: CUSTOM_ID[3], interaction: interaction.user.id };
        const UPDATE_BD = await spUpdateAtencionTicket({ interaction: DATA_INFO.interaction, currentid: DATA_INFO.currentID })
        const CHANNEL_DATA = client.channels.cache.get(DATA_INFO.idChannel)
        if (UPDATE_BD.execute) {
            await CHANNEL_DATA.permissionOverwrites.create(ROLES.asesor, {
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
            consoleLog(`<@${interaction.user}> atendera en <#${CHANNEL_DATA.id}>`)
            await CHANNEL_DATA.send({ content: `Seras atendido por: <@${interaction.user.id}>` })
            await interaction.update({ content: `Ticket tomado por <@${interaction.user.id}>`, components: [] })
        } else {
            await interaction.reply({ content: `${interaction.user} -> ${UPDATE_BD.msg}`, ephemeral: true })
        }

    }
}