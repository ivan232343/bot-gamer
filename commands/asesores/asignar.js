const { SlashCommandBuilder } = require("discord.js");
const role = require('../../json/roles.json')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("asignar")
        .setDescription("Si cerraste un ticket por error con este comando puedes darle permisos a un cliente")
        .addUserOption(option => option
            .setName("cliente")
            .setDescription("cliente a asignar")
            .setRequired(true)
        ),
    category: "asesores",
    async execute(interaction) {
        const client_id = interaction.guild.members.cache.get(interaction.options.getUser('cliente').id);
        if (client_id.roles.cache.has(role.cliente)) {
            await interaction.channel.permissionOverwrites.create(client_id, {
                SendMessages: true,
                ViewChannel: true,
                ReadMessageHistory: true
            })
            await interaction.reply({ content: `se agrego a <@${interaction.options.getUser('cliente').id}> al chat`, ephemeral: true })
            await interaction.channel.send({ content: `Hola <@${interaction.options.getUser('cliente').id}>, se le agrego al chat para darle soporte.`, ephemeral: true })
        } else {
            await interaction.reply({ content: `${interaction.options.getUser('cliente').username} no tiene el rol de gamer win`, ephemeral: true })
        }

    }
}