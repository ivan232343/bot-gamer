const { staff } = require('../../../json/roles.json');
const { sp_update_ticket_atention } = require("../../../modules/peticionesbd");

module.exports = {
    data: { name: 'catch-ticket' },
    async execute(interaction, client) {
        const dataSaved = interaction.customId.split("_")
        const info = { dni: dataSaved[1], currentID: dataSaved[2], idChannel: dataSaved[3], interaction: interaction.user.id };
        const update = await sp_update_ticket_atention({ interaction: info.interaction, currentid: info.currentID })
        const channel = client.channels.cache.get(info.idChannel)
        if (update.execute) {
            await channel.permissionOverwrites.create(staff, {
                SendMessages: false,
                ViewChannel: false,
                ReadMessageHistory: false
            })
            await channel.permissionOverwrites.create(interaction.user.id, {
                SendMessages: true,
                ViewChannel: true,
                ReadMessageHistory: true
            })
            await channel.send({ content: `Seras atendido por: <@${interaction.user.id}>` })
            await interaction.update({ content: `Ticket tomado por <@${interaction.user.id}>`, components: [] })
        } else {
            console.log(update)
            await interaction.reply({ content: `${interaction.user} -> ${update.msg}`, ephemeral: true })
        }

    }
}