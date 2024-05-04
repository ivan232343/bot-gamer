const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, } = require('discord.js')
module.exports = {
    data: {
        name: 'validation-asesor'
    },
    async execute(interaction) {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('asesor')
            .setTitle('Validacion cliente gamer');

        // Create the text input components
        const dniasesor = new TextInputBuilder()
            .setCustomId('dniasesor')
            // The label is the prompt the user sees for this input
            .setLabel("Documento de identidad")
            .setRequired(true)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setMinLength(8)
            .setMaxLength(11);
        const nombre = new TextInputBuilder()
            .setCustomId('nombreasesor')
            .setLabel("nombre")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        const apellidos = new TextInputBuilder()
            .setCustomId('apellidosasesor')
            .setLabel("apellidos")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        const birthDay = new TextInputBuilder()
            .setCustomId('bdayasesor')
            .setLabel("Fecha de cumpleaños (DD/MM)")
            .setMinLength(4)
            .setMaxLength(5)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

        // so you need one action row per text input.
        const rows = {
            firstActionRow: new ActionRowBuilder().addComponents(dniasesor),
            secondActionRow: new ActionRowBuilder().addComponents(nombre, apellidos),
            thirdActionRow: new ActionRowBuilder().addComponents(birthDay)

        }

        // Add inputs to the modal
        modal.addComponents(rows.firstActionRow, rows.secondActionRow, rows.thirdActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);
        // await interaction.reply({ content: 'Hola Cliente' })
    }
}