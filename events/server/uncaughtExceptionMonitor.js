const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1210800600795582495/J85ZnniSqZEkFfVT3upjH1XOL6BIFSeVLHa-h29NTd3SGWeYVwBd2IprvMmrboJMM_yH'
});

module.exports = {
    name: "uncaughtExceptionMonitor",
    async execute(err, origin) {
        console.log(err, "\n", origin)
        const embed = new EmbedBuilder()
            .setTitle("Uncaught Exception Monitor")
            .setURL("https://nodejs.org/api/process.html#event-uncaughtExceptionmonitor")
            .addFields({
                name: "Error",
                value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``
            }, {
                name: "Origin",
                value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``
            })
            .setTimestamp()
        return webhook.send({ embeds: [embed] })

    }
}