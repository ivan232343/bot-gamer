const { SlashCommandBuilder, ActionRowBuilder } = require("discord.js")
const { adsWinBtns } = require("../../modules/builder")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("encuesta")
        .setDescription("Envia una encuesta al chat")
    ,
    category: "asesores",
    async execute(interaction) {
        await interaction.channel.send({ content: `### Tu opinión es importante\nMe ayudaría conocer tu opinión sobre la atención que te acaba de brindar ${interaction.user}. Por favor, completa esta encuesta`, components: [new ActionRowBuilder().addComponents(adsWinBtns().sendEncuesta)] })
        await interaction.reply({ content: "Se envio correctamente", ephemeral: true })
    }
}