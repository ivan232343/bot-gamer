/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Valida si las preguntas de seguridad son las correctas, si en caso las son, entonces se 
 * estaria procediendo con la gestion de genera ticket 
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se optimizo codigo colocando una funcion en pasos redundantes/se realizo correcciones gramaticales, solicitados por experiencia
const { ActionRowBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, StringSelectMenuBuilder, AttachmentBuilder, channelLink } = require('discord.js')
const { CATEGORIA } = require('../../../json/motivos.json');
const { sp_validate_gamer_to_init } = require('../../../modules/peticionesbd');
const { adsWinBtns } = require('../../../modules/builder');
const { consoleLog } = require('../../../modules/necesarios');
const { staticsEmbeds } = require('../../../modules/embeds');
const { validarTicketPendiente } = require('../../../modules/funcionalidades');
module.exports = {
    data: { name: 'validate-service' },
    async execute(interaction) {
        const GET_DATA = interaction.customId.split("_")
        consoleLog(`${interaction.user} / validate-service / \`\`\`${GET_DATA.join("\n")}\`\`\` / ${interaction.values}`)
        const DATA_RES = { doc: GET_DATA[1], namecl: GET_DATA[2].replace(/-/g, " ").toUpperCase(), planPicked: interaction.values[0] }
        if (!DATA_RES.planPicked > 0) return await interaction.reply({ embeds: [staticsEmbeds.notGamer()], components: [new ActionRowBuilder(adsWinBtns().web, adsWinBtns().wsp)], ephemeral: true })
        const CHECK_GAMER = await sp_validate_gamer_to_init(DATA_RES)
        consoleLog("Se esta retornando este resultado", CHECK_GAMER.error ? CHECK_GAMER.error + CHECK_GAMER.f : CHECK_GAMER)
        if (!CHECK_GAMER.find) return await interaction.reply({ content: `Ups <@${interaction.user.id}>, No se pudo validar su identidad, si crees que se trata de un error intententelo nuevamente o de lo contrario no dude de reportarlo en <#1223357670975733963> para validar el inconveniente.`, ephemeral: true })
        const CHECK_PENDIENTE = await validarTicketPendiente(DATA_RES.doc)
        consoleLog("validar pendiente:", CHECK_PENDIENTE)
        if (CHECK_PENDIENTE.find) return await interaction.reply(CHECK_PENDIENTE.data)
        if (CHECK_GAMER.f.validate) {
            const OPTION_MOTIVO = Object.getOwnPropertyNames(CATEGORIA).map(e => {
                const CATEGORIA_TEMP = new StringSelectMenuOptionBuilder()
                    .setDescription(CATEGORIA[e].Descripcion)
                    .setLabel(CATEGORIA[e].Label)
                    .setValue(CATEGORIA[e].value)
                    .setEmoji(CATEGORIA[e].emoji)
                return CATEGORIA_TEMP
            })
            const SELECT_MOTIVO = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`motivo-problema-with-validate_${DATA_RES.doc}_${DATA_RES.planPicked}_${CHECK_GAMER.f.TIPO_PLAN}`)
                    .setPlaceholder('Seleccione el motivo de consulta')
                    .addOptions(OPTION_MOTIVO)
            )
            return await interaction.reply({
                content: `Paso 2. <@${interaction.user.id}> elige el motivo que más se asemeje a tu consulta.`,
                ephemeral: true,
                components: [SELECT_MOTIVO]
            })
        } else {
            const BUTTONS_EMB = new ActionRowBuilder().addComponents(
                adsWinBtns().web,
                adsWinBtns().wsp,
                // adsWinBtns().upgrade
            );
            const ATTCHMT = new AttachmentBuilder('src/img/eseciales/wingamer.jpg')
            const EMBED_NGAMER = new EmbedBuilder()
                .setTitle(`Ups, no tienes planes gamer de WIN`)
                .setDescription("Actualmente el Discord es un beneficio exclusivo para nuestra comunidad de Planes Gamer. Pero puede contratarlo llamando al 01 707 3000 o ingresando a los links que le dejare a continuación:")
                .setImage("attachment://wingamer.jpg")
                .setColor("Orange")
            return await interaction.reply({
                embeds: [EMBED_NGAMER],
                ephemeral: true,
                components: [BUTTONS_EMB],
                files: [ATTCHMT]
            })
        }
    }
}
