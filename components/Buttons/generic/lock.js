/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Boton que bloquea al usuario(cliente) la opcion de escribir en el canal de su caso generado
 */
const { PermissionFlagsBits } = require('discord.js');
let { asesor } = require('../../../json/roles.json')
module.exports = {
    data: { name: 'lock' },
    async execute(interaction) {
        const CLIENTE_ID = interaction.customId.split("_")[1];
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has(asesor)) return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });
        try {
            await interaction.channel.permissionOverwrites.create(CLIENTE_ID, {
                SendMessages: false,
                ViewChannel: false,
                ReadMessageHistory: false
            })
            await interaction.reply({ content: `Canal bloqueado con exito`, ephemeral: true })
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: `Error al bloquear el canal intentelo nuevamente`, ephemeral: true })
        }
    }
}