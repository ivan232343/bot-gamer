const { categoria } = require('../../../json/motivos.json');
const { adsWinBtns, embedsB } = require('../../../modules/builder')
const { StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");
const { sp_get_discordid_doc, sp_validate_gamer } = require("../../../modules/peticionesbd");

module.exports = {
    data: {
        name: 'previus-reg'
    },
    async execute(interaction, client) {
        const dni = await sp_get_discordid_doc(interaction.user.id);
        // console.log(dni)
        if (typeof dni !== 'string') {
            const getValidateGamer = await sp_validate_gamer(dni.f.dni);
            // console.log(getValidateGamer)
            if (getValidateGamer.find) {
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
                        .setCustomId(`motivo-problema_${dni.f.dni}`)
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
                    // adsWinBtns(dni).upgrade
                );
                const embed = embedsB().notGamer
                return await interaction.reply({ embeds: [embed], ephemeral: true, components: [buttons] })
            }
        } else {
            return await interaction.reply({ content: dni, ephemeral: true })
        }

    }
}