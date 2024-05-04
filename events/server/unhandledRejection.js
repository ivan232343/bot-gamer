const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1210800600795582495/J85ZnniSqZEkFfVT3upjH1XOL6BIFSeVLHa-h29NTd3SGWeYVwBd2IprvMmrboJMM_yH'
});

module.exports = {
    name: "unhandledRejection",
    async execute(reason, promise) {
        console.log(reason, "\n", promise)
        const embed = new EmbedBuilder()
            .setTitle("Unhandled Rejection/catch")
            .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
            .addFields({
                name: "Reason",
                value: `\`\`\`${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``
            }, {
                name: "Promise",
                value: `\`\`\`${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``
            })
            .setTimestamp()
        return webhook.send({ embeds: [embed] })
    }
}