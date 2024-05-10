const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1237160113777807501/1UM1hAq_pu1okA9x39nSeE2FPrQaV4BpdzBAtfbLArrqVcDmRw906fZRWcbh2q1AM1kF'
});

module.exports = {
    name: "warning",
    async execute(warn) {
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