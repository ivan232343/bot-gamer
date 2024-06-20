/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Con este boton se apertura un modal y se registra con el ID registro del crm 
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables
const { PermissionFlagsBits, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { ROLES } = require('../../../configdiscord.json')
module.exports = {
    data: { name: 'close-ticket' },
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has(ROLES.asesor))
            return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });

        const MODAL = new ModalBuilder()
            .setCustomId('cerrar-ticket_' + interaction.customId.split("_")[1])
            .setTitle('Cierra con el ticket de atencion');

        const ID_REGISTRO_CRM = new TextInputBuilder()
            .setCustomId('idregistro')
            .setLabel("Ticket de atencion (AT-xxxxxxxx)")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);
        const PRIMERA_FILA = new ActionRowBuilder().addComponents(ID_REGISTRO_CRM);

        MODAL.addComponents(PRIMERA_FILA);
        await interaction.showModal(MODAL);
    }
}