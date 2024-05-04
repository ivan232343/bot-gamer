const { PermissionFlagsBits, } = require('discord.js')
module.exports = {
    data: {
        name: 'unlock',
        ReadMessageHistory: true
    },
    async execute(interaction, client, args) {
        // console.log(client)
        // const user = client.users.cache.get(interaction.customId.split("_")[1])
        const mainuser = interaction.customId.split("_")[1];

        // console.log(user, mainuser)
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has("1169343480552755231")) return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });
        try {
            await interaction.channel.permissionOverwrites.create(mainuser, {
                SendMessages: true,
                ViewChannel: true,
                ReadMessageHistory: true
            })
            await interaction.reply({ content: `Canal desbloquear con exito`, ephemeral: true })
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: `Error al desbloquear el canal intentelo nuevamente`, ephemeral: true })
        }
    }
}