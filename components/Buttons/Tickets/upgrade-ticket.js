const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js")
const { ticketbtns } = require("../../../modules/builder");
const { cliente, staff } = require('../../../json/roles.json');
const { parenClients } = require('../../../json/canales.json')
module.exports = {
    data: {
        name: "upgrade-ticket"
    },
    async execute(interaction, client) {

        // const name = interaction.customId.split("_")[2];
        const dni = interaction.customId.split("_")[1];
        // aca ira el codigo para generar otro canal y eso 
        await interaction.reply({ content: 'Estamos generando su ticket...', ephemeral: true })
        const buttons = new ActionRowBuilder().addComponents(
            ticketbtns(interaction.user.id).lock,
            ticketbtns(interaction.user.id).unlock,
            ticketbtns().close
        )
        const embedB = new EmbedBuilder()
            .setTitle(`Bienvenido a tu ticket de atencion.`)
            .setDescription(`<@${interaction.user.id}>, en instantes un asesor se pondra en contacto para levelear tu servicio 🎮`)

        const staffs = interaction.guild.roles.cache.get(staff);
        const channel = await interaction.guild.channels.create({
            name: `ventas-${dni}-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: parenClients,
            permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                deny: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.ReadMessageHistory
                ]
            }, {
                id: interaction.user.id,
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.ReadMessageHistory
                ]
            }, {
                id: staffs,
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.ReadMessageHistory
                ]
            }]
        })
        await interaction.member.roles.add(cliente)
        await channel.send({
            embeds: [embedB], components: [buttons]
        })
        await interaction.editReply({ content: `Tu ticket fue creado en <#${channel.id}>`, ephemeral: true })

    }
}