/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Boton que desbloquea el canal al cliente
 */

const { PermissionFlagsBits, } = require('discord.js')
let { asesor } = require('../../../json/roles.json')
module.exports = {
    data: { name: 'unlock' },
    async execute(interaction) {
        const CLIENTE_ID = interaction.customId.split("_")[1];
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has(asesor)) return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });
        try {
            await interaction.channel.permissionOverwrites.create(CLIENTE_ID, {
                SendMessages: true,
                ViewChannel: true,
                ReadMessageHistory: true
            })
            await interaction.reply({ content: `Canal desbloqueado con exito`, ephemeral: true })
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: `Error al desbloquear el canal intentelo nuevamente`, ephemeral: true })
        }
    }
}