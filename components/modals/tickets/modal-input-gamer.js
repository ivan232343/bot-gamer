const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder
    , StringSelectMenuBuilder } = require('discord.js');
const { get } = require('../../../modules/conectbd');
const { categoria } = require('../../../json/motivos.json');
const { adsWinBtns } = require('../../../modules/builder');
module.exports = {
    data: {
        name: 'modal-input-gamer'
    },
    async execute(interaction) {
        // console.log(interaction);
        const dni = interaction.fields.getTextInputValue("dnicliente");
        const query = `CALL \`sp_validate_gamer\`('${dni}')`;
        const getValidateGamer = await get(query).then(res => res.resultados[0]);
        if (getValidateGamer.length !== 0) {
            // console.log(datacliente)
            const optionsMotivo = Object.getOwnPropertyNames(categoria).map(e => {
                const tempCategoria = new StringSelectMenuOptionBuilder()
                    .setDescription(categoria[e].Descripcion)
                    .setLabel(categoria[e].Label)
                    .setValue(categoria[e].value)
                    .setEmoji(categoria[e].emoji)
                return tempCategoria
            })
            // console.log(optionsMotivo)
            const motivo = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`motivo-problema_${dni}`)
                    .setPlaceholder('Seleccione el motivo de la consulta')
                    .addOptions(optionsMotivo)
            )
            return await interaction.reply({
                content: `Genial <@${interaction.user.id}>, Para continuar necesitamos que detalle su problema o consulta.`,
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
    }
}