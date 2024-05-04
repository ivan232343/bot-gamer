const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1210800600795582495/J85ZnniSqZEkFfVT3upjH1XOL6BIFSeVLHa-h29NTd3SGWeYVwBd2IprvMmrboJMM_yH'
});

module.exports = {
    name: "warning",
    async execute(warn) {
        console.log(warn, "uwu")
        const embed = new EmbedBuilder()
            .setTitle("Uncaught Exception Monitor Warning")
            .setURL("https://nodejs.org/api/process.html#event-warning")
            .addFields({
                name: "Warn",
                value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\``
            })
            .setTimestamp()
        return webhook.send({ embeds: [embed] })
    }
}