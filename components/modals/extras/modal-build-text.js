module.exports = {
    data: {
        name: 'modal-build-text'
    },
    async execute(interaction) {
        const textBuild = interaction.fields.getTextInputValue("buildertexttosend");
        console.log(textBuild);
        await interaction.channel.send({
            content: textBuild
        }).then(() => {
            interaction.reply({ content: "Enviado exitosamente", ephemeral: true })
        })
    }
}