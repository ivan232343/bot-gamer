/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Comando para desasignar a un usuario dentro del canal de texto
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 21/06/2024 se corrigeron las variables / se eliminaron los comentarios
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("desasignar")
        .setDescription("Si te equivocaste de cliente con este comando puedes quitarle permisos a un cliente")
        .addUserOption(option =>
            option
                .setName("cliente")
                .setDescription("cliente o asesor a desasignar")
                .setRequired(true)
        )
    ,
    category: "asesores",
    async execute(interaction) {
        const CLIENTE_ID = interaction.guild.members.cache.get(interaction.options.getUser('cliente').id);
        await interaction.channel.permissionOverwrites.create(CLIENTE_ID, {
            SendMessages: false,
            ViewChannel: false,
            ReadMessageHistory: false
        })
        await interaction.reply({ content: `se elimino a <@${interaction.options.getUser('cliente').id}> del chat`, ephemeral: true })
    }
}