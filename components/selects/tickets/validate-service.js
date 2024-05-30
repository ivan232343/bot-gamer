/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Valida si las preguntas de seguridad son las correctas, si en caso las son, entonces se 
 * estaria procediendo con la gestion de genera ticket 
 */
const { ActionRowBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, StringSelectMenuBuilder, AttachmentBuilder } = require('discord.js')
const { categoria } = require('../../../json/motivos.json');
const { sp_validate_gamer_to_init, sp_validate_tktpendiente } = require('../../../modules/peticionesbd');
const { adsWinBtns } = require('../../../modules/builder');
const { toUTC } = require('../../../modules/utclocalconverter');
module.exports = {
    data: {
        name: 'validate-service'
    },
    async execute(interaction) {
        const GET_DATA = interaction.customId.split("_")
        const DATA_RES = { doc: GET_DATA[1], namecl: GET_DATA[2].replace(/-/g, " ").toUpperCase(), planPicked: interaction.values[0] }
        const CHECK_GAMER = await sp_validate_gamer_to_init(DATA_RES)
consolé.log(CHECK_GAMER);
        if (!CHECK_GAMER.find) return await interaction.reply({ content: `Ups <@${interaction.user.id}>, No se pudo validar su identidad, si crees que se trata de un error intententelo nuevamente o de lo contrario no dude de reportarlo en <#1223357670975733963> para validar el inconveniente.`, ephemeral: true })
        const CHECK_PENDIENTE = await sp_validate_tktpendiente(DATA_RES.doc)
        if (!CHECK_PENDIENTE.find) {
            if (CHECK_GAMER.f.validate === 1) {
                const OPTION_MOTIVO = Object.getOwnPropertyNames(categoria).map(e => {
                    const CATEGORIA_TEMP = new StringSelectMenuOptionBuilder()
                        .setDescription(categoria[e].Descripcion)
                        .setLabel(categoria[e].Label)
                        .setValue(categoria[e].value)
                        .setEmoji(categoria[e].emoji)
                    return CATEGORIA_TEMP
                })
                const SELECT_MOTIVO = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(`motivo-problema-with-validate_${DATA_RES.doc}_${DATA_RES.namecl}_${DATA_RES.planPicked}`)
                        .setPlaceholder('Seleccione el motivo de consulta')
                        .addOptions(OPTION_MOTIVO)
                )
                return await interaction.reply({
                    content: `Genial <@${interaction.user.id}>, Para generar su ticket necesitamos que nos indique cual es el motivo de su consulta.`,
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
        } else {
            const FECHA_APERTURA = toUTC(CHECK_PENDIENTE.f.time_create)
            const STR_APERTURA = `${(FECHA_APERTURA.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_APERTURA.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_APERTURA.getFullYear()} ${(FECHA_APERTURA.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCSeconds()).toString().padStart(2, '0')}`
            const FECHA_ATENCION = CHECK_PENDIENTE.f.time_init !== null ? toUTC(CHECK_PENDIENTE.f.time_init) : ""
            const STR_CREADO = FECHA_ATENCION !== "" ? `${(FECHA_ATENCION.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_ATENCION.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_ATENCION.getFullYear()} ${(FECHA_ATENCION.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCSeconds()).toString().padStart(2, '0')}` : ""
            await interaction.reply({
                content: `Se valida ticket pendiente en <#${CHECK_PENDIENTE.f.channel_id}> creado el  ${STR_APERTURA}\n${CHECK_PENDIENTE.f["adviser_i-id_init"] !== null ? `Siendo atendido por <@${CHECK_PENDIENTE.f["adviser_i-id_init"]}> desde ${STR_CREADO} ` : ""}`,
                ephemeral: true
            })

        }

    }
}
