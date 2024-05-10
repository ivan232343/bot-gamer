const { PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: {
        name: 'lock'
    },
    async execute(interaction) {
        const mainuser = interaction.customId.split("_")[1];
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has("1169343480552755231")) return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });
        try {
            await interaction.channel.permissionOverwrites.create(mainuser, {
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