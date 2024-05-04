const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js")
const { get } = require("../../../modules/conectbd")
const { ticketbtns } = require("../../../modules/builder")
const { parenClients } = require("../../../json/canales.json")
module.exports = {
    data: {
        name: "upgrade-gamer"
    },
    async execute(interaction, client) {
        // Create the modal
        const preDoc = interaction.customId.split("_")[1]
        console.log(preDoc)
        if (typeof preDoc !== 'undefined' && preDoc !== '') {
            const dni = preDoc
            const query = `CALL \`sp_validate_gamer\`('${dni}')`;
            const gamerValidator = await get(query).then(res => res.resultados[0]).catch(res => { return { msg: "Ocurrio un error falta", err: true, info: res } })
            console.log(gamerValidator)
            if (typeof gamerValidator.err === 'undefined') {
                if (gamerValidator.length === 0) {
                    await interaction.reply({ content: 'Estamos generando su ticket...', ephemeral: true })
                    const motivo = "Upgrade del servicio"
                    const problematica = "Consulta o venta del servicio de los planes Gamer de win"
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
                        }]
                    })

                    const currentID = await get(`CALL \`sp_init_ticket\`('${channel.id}','${dni}','${motivo}','${problematica}')`).then(res => res.resultados[0][0].current_insert).catch(res => { return "error interno" && console.log(res) })
                    if (currentID !== "error interno") {
                        const webhook = interaction.guild.channels.cache.find((ch) => ch.name === 'tickets-pendientes');

                        const embedB = new EmbedBuilder()
                            .setTitle(`Bienvenido a su ticket de atencion.`)
                            .setDescription(`<@${interaction.user.id}>, en instantes un asesor se pondra en contacto contigo para poder ayudarte con tu servicio  ${typeof motivo !== 'undefined' ? "\nMotivo de consulta:\n```" + motivo + "```" : ''} ${problematica !== '' ? "\nResumen del problema:\n```" + problematica + "```" : ''}`)
                        const embedAnunciement = new EmbedBuilder()
                            .setTitle("Cliente solicita upgrade de su servicio 🎉🎉")
                            .setDescription(`El cliente <@${interaction.user.id}> esta solicitando venta en <#${channel.id}>  ${motivo !== '' ? "\nMotivo de consulta:\n```" + motivo + "```" : ''} ${problematica !== '' ? "\nResumen del problema:\n```" + problematica + "```" : ''}`)
                            .setColor("Random")

                        const btnsGetTicket = new ActionRowBuilder().addComponents(
                            ticketbtns(`${dni}_${currentID}_${channel.id}`).catchTicket
                        )
                        const buttons = new ActionRowBuilder().addComponents(
                            ticketbtns(interaction.user.id).lock,
                            ticketbtns(interaction.user.id).unlock,
                            ticketbtns(currentID).close
                        )
                        const mensaje = await channel.send({ embeds: [embedB], components: [buttons] });
                        mensaje.pin()
                            .then(() => { console.log('Mensaje anclado con éxito.'); })
                            .catch((error) => { console.error('Error al anclar el mensaje:', error); });
                        await webhook.send({ embeds: [embedAnunciement], components: [btnsGetTicket] });
                        await interaction.editReply({ content: `Tu ticket fue creado en <#${channel.id}>`, ephemeral: true });
                    } else {
                        await interaction.editReply({ content: `Ocurrio un problema al generar su ticket, por favor intentelo mas tarde`, ephemeral: true });
                    }
                }
            }
        } else {
            const modal = new ModalBuilder()
                .setCustomId('upgrade-gamer')
                .setTitle('Genera tu ticket de atencion');

            // Create the text input components
            const dnicliente = new TextInputBuilder()
                .setCustomId('dnicliente')
                // The label is the prompt the user sees for this input
                .setLabel("Su documento de identidad (requerido)")
                .setRequired(true)
                // Short means only a single line of text
                .setStyle(TextInputStyle.Short);

            // so you need one action row per text input.
            const firstActionRow = new ActionRowBuilder().addComponents(dnicliente);
            // const secondActionRow = new ActionRowBuilder().addComponents(resumenProblema);

            // Add inputs to the modal
            modal.addComponents(firstActionRow);
            // Show the modal to the user
            await interaction.showModal(modal);
            // await interaction.reply({ content: 'Hola Cliente' })
        }
    }

}