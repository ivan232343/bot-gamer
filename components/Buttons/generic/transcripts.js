const { PermissionFlagsBits, } = require('discord.js')
const transcripts = require("discord-html-transcripts")
module.exports = {
    data: {
        name: 'transcripts'
    },
    async execute(interaction, client) {
        console.log(interaction.member.permissions, PermissionFlagsBits.Administrator, interaction.member.roles.cache.has("1169343480552755231"))
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.has("1169343480552755231")) return interaction.reply({ content: `No tienes permisos necesarios para utilizar este boton`, ephemeral: true });
        const channel = interaction.channel;
        const attachment = await transcripts.createTranscript(channel);
        interaction.reply({ files: [attachment], ephemeral: true })
    }
}