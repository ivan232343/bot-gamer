/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Comando para asignar a un usuario dentro del canal de texto
 */
const { SlashCommandBuilder } = require("discord.js");
const role = require('../../json/roles.json');
const { consoleLog } = require("../../modules/necesarios");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("asignar")
        .setDescription("Si cerraste un ticket por error con este comando puedes darle permisos a un cliente")
        .addUserOption(option => option
            .setName("cliente")
            .setDescription("cliente o asesor a asignar")
            .setRequired(true)
        ),
    category: "asesores",
    async execute(interaction) {
        const CLIENTE_ID = interaction.guild.members.cache.get(interaction.options.getUser('cliente').id);
        await interaction.channel.permissionOverwrites.create(CLIENTE_ID, {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true
        })
        if (CLIENTE_ID.roles.cache.has(role.asesor)) {
            await interaction.reply({ content: `${interaction.options.getUser('cliente').username} es asesor`, ephemeral: true })
            await interaction.channel.send({ content: `Ahora seras atendido por <@${interaction.options.getUser('cliente').id}>.` })
            consoleLog(`<@${interaction.user.id}> uso el comando asignar para <@${interaction.options.getUser('cliente').id}> en el canal <#${interaction.channel.id}>`)
        } else if (CLIENTE_ID.roles.cache.has(role.cliente)) {
            await interaction.reply({ content: `se agrego a <@${interaction.options.getUser('cliente').id}> al canal de texto`, ephemeral: true })
            await interaction.channel.send({ content: `Hola <@${interaction.options.getUser('cliente').id}>, se le agrego al chat para darle soporte.` })
            consoleLog(`<@${interaction.user.id}> uso el comando asignar para <@${interaction.options.getUser('cliente').id}> en el canal <#${interaction.channel.id}>`)
        } else {
            await interaction.channel.send({ content: `se agrego a <@${interaction.options.getUser('cliente').id}> al canal de texto` })
            await interaction.reply({ content: `<@${interaction.options.getUser('cliente').id}> no es cliente gamer ni asesor, ¿Por que lo quieres agregar?`, ephemeral: true })
            consoleLog(`<@${interaction.user.id}> uso el comando asignar para <@${interaction.options.getUser('cliente').id}> en el canal <#${interaction.channel.id}>`)
        }

    }
}