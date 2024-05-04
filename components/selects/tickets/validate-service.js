const { ActionRowBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js')
const { categoria } = require('../../../json/motivos.json');
const { sp_validate_gamer } = require('../../../modules/peticionesbd');
const { adsWinBtns } = require('../../../modules/builder');
module.exports = {
    data: {
        name: 'validate-service'
    },
    async execute(interaction) {
        const ret = interaction.customId.split("_")
        console.log(ret)
        const data = {
            dni: ret[1],
            name: ret[2],
            servicio: interaction.values[0]
        }
        //aca deberia validar el servicio x dni x nombre y cantidad de velocidad
        const serv = true
        if (serv) {
            const validarGamer = await sp_validate_gamer(data.dni)

            // if (validarGamer.find) {
            if (serv) {
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
                        .setCustomId(`motivo-problema-with-validate_${data.dni}_${data.name}_${data.servicio}`)
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
            await interaction.reply({
                content: `Ups <@${interaction.user.id}>, No se pudo validar su identidad, si crees que se trata de un error intententelo nuevamente o de lo contrario no dude de reportarlo en <#1223357670975733963> para validar el inconveniente.`,
                ephemeral: true
            })
        }

    }
}