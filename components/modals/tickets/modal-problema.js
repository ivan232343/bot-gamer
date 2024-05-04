const { ActionRowBuilder, Client, EmbedBuilder, ChannelType, PermissionsBitField, WebhookClient } = require('discord.js');
const { parenClients } = require("../../../json/canales.json");
const { staff, cliente } = require("../../../json/roles.json");
const { ticketbtns } = require('../../../modules/builder');
const { sp_init_ticket } = require('../../../modules/peticionesbd');

module.exports = {
    data: {
        name: 'modal-problema'
    },
    async execute(interaction) {
        const ret = interaction.customId.split("_")
        const data = {
            dni: ret[1],
            name: ret[2],
            servicio: ret[3],
            categoriaPicked: ret[4]
        }
        const motivo = interaction.customId.split("_")[2];
        const dni = interaction.customId.split("_")[1];
        const problematica = interaction.fields.getTextInputValue("resumenProblema");
        // aca ira el codigo para generar otro canal y eso 
        await interaction.reply({ content: 'Estamos generando su ticket...', ephemeral: true })
        const staffs = interaction.guild.roles.cache.get(staff)
        const channel = await interaction.guild.channels.create({
            name: `ticket-${dni}-${interaction.user.username}`,
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
            }]
        })
        const init = await sp_init_ticket({ channel: channel.id, dni: dni, motivo: motivo, problema: problematica, interaction: interaction.user.id })
        console.log(init)
        if (init.execute) {
            const webhook = interaction.guild.channels.cache.find((ch) => ch.name === 'tickets-pendientes');
            const currentID = init.data.current_insert
            const embedB = new EmbedBuilder()
                .setTitle(`Bienvenido a su ticket de atencion.`)
                .setDescription(`<@${interaction.user.id}>, en instantes un asesor se pondra en contacto contigo para poder ayudarte con tu servicio  ${typeof motivo !== 'undefined' ? "\nMotivo de consulta:\n```" + motivo + "```" : ''} ${problematica !== '' ? "\nResumen del problema:\n```" + problematica + "```" : ''}`)
            const embedAnunciement = new EmbedBuilder()
                .setTitle("Nuevo cliente solicitando atencion")
                .setDescription(`El cliente <@${interaction.user.id}> esta solicitando atencion en <#${channel.id}>\nDocumento del cliente\n\`\`\`${dni}\`\`\`  ${motivo !== '' ? "\nMotivo de consulta:\n```" + motivo + "```" : ''} ${problematica !== '' ? "\nResumen del problema:\n```" + problematica + "```" : ''}`)

            const btnsGetTicket = new ActionRowBuilder().addComponents(
                ticketbtns(`${dni}_${currentID}_${channel.id}`).catchTicket
            )
            const buttons = new ActionRowBuilder().addComponents(
                ticketbtns(interaction.user.id).lock,
                ticketbtns(interaction.user.id).unlock,
                ticketbtns(currentID).close
            )
            await interaction.member.roles.add(cliente);
            const mensaje = await channel.send({ embeds: [embedB], components: [buttons] });
            mensaje.pin()
                .then(() => {
                    console.log('Mensaje anclado con éxito.');
                })
                .catch((error) => {
                    console.error('Error al anclar el mensaje:', error);
                });
            await webhook.send({ embeds: [embedAnunciement], components: [btnsGetTicket] });
            await interaction.editReply({ content: `Tu ticket fue creado en <#${channel.id}>`, ephemeral: true });
        } else {
            await interaction.editReply({ content: `Ocurrio un problema al generar su ticket, por favor intentelo mas tarde`, ephemeral: true });
        }
        // console.log(setData)
    }
}