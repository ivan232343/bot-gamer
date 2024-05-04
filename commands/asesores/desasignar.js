const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("desasignar")
        .setDescription("Si te equivocaste de cliente con este comando puedes quitarle permisos a un cliente")
        .addUserOption(option =>
            option
                .setName("cliente")
                .setDescription("cliente a desasignar")
                .setRequired(true)
        )
    ,
    category: "asesores",
    async execute(interaction) {
        // const cliente = interaction.option.getUser("cliente")
        const cliente = interaction.guild.members.cache.get(interaction.options.getUser('cliente').id);
        await interaction.channel.permissionOverwrites.create(cliente, {
            SendMessages: false,
            ViewChannel: false,
            ReadMessageHistory: false
        })
        await interaction.reply({ content: `se elimino a <@${interaction.options.getUser('cliente').id}> del chat`, ephemeral: true })
    }
}