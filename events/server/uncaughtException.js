const { EmbedBuilder, WebhookClient } = require('discord.js')
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1237160113777807501/1UM1hAq_pu1okA9x39nSeE2FPrQaV4BpdzBAtfbLArrqVcDmRw906fZRWcbh2q1AM1kF'
});

module.exports = {
    name: "uncaughtException",
    async execute(err, origin) {
        const embed = new EmbedBuilder()
            .setTitle("Uncaught Exception")
            .setURL("https://nodejs.org/api/process.html#event-uncaughtException")
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