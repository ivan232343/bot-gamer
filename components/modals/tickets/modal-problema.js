/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Despues que el cliente coloque que inconveniente esta teniendo, se guardara en la base de datos la fecha
 * y hora, el interaction id del cliente, el id del canal que se genero,despues se generara un canal donde 
 * solo estara el asesor(cuando haga click en atrapar ticket dentro de tickets-pendiente) y el cliente
 */

const { ActionRowBuilder, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const { CHANNELS, ROLES } = require("../../../configdiscord.json");
const { CATEGORIA } = require("../../../json/motivos.json");
const { ticketbtns } = require('../../../modules/builder');
const { spIniciarTicket } = require('../../../modules/peticionesbd');
const { consoleLog } = require('../../../modules/necesarios');

module.exports = {
    data: { name: 'modal-problema' },
    async execute(interaction) {
        const MOTIVO_INPT = interaction.customId.split("_")[2];
        const DNI_CLIENTE = interaction.customId.split("_")[1];
        const TIPO_PLAN = interaction.customId.split("_")[3];
        const DETALLER_INPT = interaction.fields.getTextInputValue("resumenProblema");
        await interaction.reply({ content: 'Estamos generando su ticket...', ephemeral: true })
        const CHANNEL_CREATED = await interaction.guild.channels.create({
            name: `ticket-${DNI_CLIENTE}-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: CHANNELS.parenClients,
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
        const INIT_TICKET = await spIniciarTicket({ channel: CHANNEL_CREATED.id, dni: DNI_CLIENTE, motivo: CATEGORIA[MOTIVO_INPT].Label, problema: DETALLER_INPT, interaction: interaction.user.id })
        consoleLog("Iniciando ticket para " + interaction.user, INIT_TICKET)
        if (!INIT_TICKET.execute) return await interaction.editReply({ content: `Ocurrio un problema al generar su ticket, por favor intentelo mas tarde`, ephemeral: true });
        const CHANNEL_SEND_TP = interaction.guild.channels.cache.find((ch) => ch.name === 'tickets-pendientes');
        const CURRENT_ID_BD = INIT_TICKET.data.current_insert
        const EMBED_CH_ATENCION = new EmbedBuilder()
            .setTitle(`Bienvenido a su ticket de atencion.`)
            .setDescription(`<@${interaction.user.id}>, en instantes un asesor se pondra en contacto contigo para poder ayudarte con tu servicio  \nTipo de plan:\n\`\`\`${TIPO_PLAN}\`\`\`${typeof MOTIVO_INPT !== 'undefined' ? "\nMotivo de consulta:\n```" + CATEGORIA[MOTIVO_INPT].Label + "```" : ''} ${DETALLER_INPT !== '' ? "\nResumen del problema:\n```" + DETALLER_INPT + "```" : ''}`)
        const EMBED_CH_ANUNCIOS = new EmbedBuilder()
            .setTitle("Nuevo cliente solicitando atencion")
            .setDescription(`El cliente <@${interaction.user.id}> esta solicitando atencion en <#${CHANNEL_CREATED.id}>\nDocumento del cliente:\n\`\`\`${DNI_CLIENTE}\`\`\`\n${MOTIVO_INPT !== '' ? "Motivo de consulta:\n```" + CATEGORIA[MOTIVO_INPT].Label + "```" : ''} ${DETALLER_INPT !== '' ? "\nResumen del problema:\n```" + DETALLER_INPT + "```" : ''}`)

        const BTNS_EMBED_ANUNCIOS = new ActionRowBuilder().addComponents(
            ticketbtns(`${DNI_CLIENTE}_${CURRENT_ID_BD}_${CHANNEL_CREATED.id}`).catchTicket
        )
        const buttons = new ActionRowBuilder().addComponents(
            ticketbtns(CURRENT_ID_BD).close
        )
        await interaction.member.roles.add(ROLES.cliente);
        const MENSAJE_GENERATE = await CHANNEL_CREATED.send({ content: `<@&${ROLES.asesor}>`, embeds: [EMBED_CH_ATENCION], components: [buttons] });
        MENSAJE_GENERATE.pin()
            .then(() => {
                consoleLog('Mensaje anclado con éxito.');
            })
            .catch((error) => {
                consoleLog('Error al anclar el mensaje:', error);
            });
        await CHANNEL_SEND_TP.send({ embeds: [EMBED_CH_ANUNCIOS], components: [BTNS_EMBED_ANUNCIOS] });
        await interaction.editReply({ content: `Tu ticket fue creado en <#${CHANNEL_CREATED.id}>`, ephemeral: true });
    }
}

