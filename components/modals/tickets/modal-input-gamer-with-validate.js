const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder
    , StringSelectMenuBuilder } = require('discord.js');
const { planes } = require('../../../json/motivos.json');
module.exports = {
    data: {
        name: 'modal-input-gamer-with-validate'
    },
    async execute(interaction) {
        const dni = interaction.fields.getTextInputValue("dnicliente");
        const nombreCl = interaction.fields.getTextInputValue("namecliente");
        const optionsMotivo = planes.map(el => {
            const tempCategoria = new StringSelectMenuOptionBuilder()
                .setLabel(el.label)
                .setValue(el.value)
                .setEmoji(el.emoji)
            return tempCategoria
        })
        console.log("aca se tiene que hacer una validacion del nombre dni, se puede traer con el dni el plan de servicio para validar")
        const motivo = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(`validate-service_${dni}_${nombreCl.replaceAll(" ", "-")}`)
                .setPlaceholder('Seleccione el plan que cuenta actualmente')
                .addOptions(optionsMotivo)
        )
        return await interaction.reply({
            content: `Genial <@${interaction.user.id}>, Para continuar necesitamos que seleccione el plan que tiene actualmente.`,
            ephemeral: true,
            components: [motivo]
        })

    }
}