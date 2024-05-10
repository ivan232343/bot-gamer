const { ActionRowBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js')
const { categoria } = require('../../../json/motivos.json');
const { sp_validate_gamer_to_init, sp_validate_tktpendiente } = require('../../../modules/peticionesbd');
const { adsWinBtns } = require('../../../modules/builder');
const { toUTC } = require('../../../modules/utclocalconverter');
module.exports = {
    data: {
        name: 'validate-service'
    },
    async execute(interaction) {
        const ret = interaction.customId.split("_")
        console.log(ret)
        const data = { doc: ret[1], namecl: ret[2], planPicked: interaction.values[0] }
        //aca deberia validar el servicio x dni x nombre y cantidad de velocidad
        const validarGamer = await sp_validate_gamer_to_init(data)
        if (validarGamer.find) {
            const validateAtencion = await sp_validate_tktpendiente(data.doc)
            if (!validateAtencion.find) {
                if (validarGamer.f.validate === 1) {
                    const optionsMotivo = Object.getOwnPropertyNames(categoria).map(e => {
                        const tempCategoria = new StringSelectMenuOptionBuilder()
                            .setDescription(categoria[e].Descripcion)
                            .setLabel(categoria[e].Label)
                            .setValue(categoria[e].value)
                            .setEmoji(categoria[e].emoji)
                        return tempCategoria
                    })
                    const motivo = new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`motivo-problema-with-validate_${data.doc}_${data.namecl}_${data.planPicked}`)
                            .setPlaceholder('Seleccione el motivo de consulta')
                            .addOptions(optionsMotivo)
                    )
                    return await interaction.reply({
                        content: `Genial <@${interaction.user.id}>, Para generar su ticket necesitamos que nos indique cual es el motivo de su consulta.`,
                        ephemeral: true,
                        components: [motivo]
                    })
                } else {
                    const buttons = new ActionRowBuilder().addComponents(
                        adsWinBtns().web,
                        adsWinBtns().wsp,
                        // adsWinBtns().upgrade
                    );
                    const embed = new EmbedBuilder()
                        .setTitle(`Ups, no tienes planes gamer de WIN`)
                        .setDescription("Actualmente el Discord es un beneficio exclusivo para nuestra comunidad de Planes Gamer. Pero puede contratarlo llamando al {numero de win} o ingresando a los links que le dejare a continuación:")
                        .setImage("https://win.pe/img/share/wingamer.jpg")
                        .setColor("Orange")
                    return await interaction.reply({
                        embeds: [embed],
                        ephemeral: true,
                        components: [buttons]
                    })
                }
            } else {
                console.log(validateAtencion)
                const fechaApertura = toUTC(validateAtencion.f.time_create)
                const creadoApertura = `${(fechaApertura.getUTCDate()).toString().padStart(2, '0')}/${(fechaApertura.getUTCMonth() + 1).toString().padStart(2, '0')}/${fechaApertura.getFullYear()} ${(fechaApertura.getUTCHours()).toString().padStart(2, '0')}:${(fechaApertura.getUTCMinutes()).toString().padStart(2, '0')}:${(fechaApertura.getUTCSeconds()).toString().padStart(2, '0')}`
                const fechaAtencion = validateAtencion.f.time_init !== null ? toUTC(validateAtencion.f.time_init) : ""
                const creadoAtencion = fechaAtencion !== "" ? `${(fechaAtencion.getUTCDate()).toString().padStart(2, '0')}/${(fechaAtencion.getUTCMonth() + 1).toString().padStart(2, '0')}/${fechaAtencion.getFullYear()} ${(fechaAtencion.getUTCHours()).toString().padStart(2, '0')}:${(fechaAtencion.getUTCMinutes()).toString().padStart(2, '0')}:${(fechaAtencion.getUTCSeconds()).toString().padStart(2, '0')}` : ""
                await interaction.reply({
                    content: `Se valida ticket pendiente en <#${validateAtencion.f.channel_id}> creado el  ${creadoApertura}\n${validateAtencion.f["adviser_i-id_init"] !== null ? `Siendo atendido por <@${validateAtencion.f["adviser_i-id_init"]}> desde ${creadoAtencion} ` : ""}`,
                    ephemeral: true
                })

            }
        } else {
            await interaction.reply({
                content: `Ups <@${interaction.user.id}>, No se pudo validar su identidad, si crees que se trata de un error intententelo nuevamente o de lo contrario no dude de reportarlo en <#1223357670975733963> para validar el inconveniente.`,
                ephemeral: true
            })
        }
    }
}