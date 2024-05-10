const { EmbedBuilder, WebhookClient } = require('discord.js');
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1237160113777807501/1UM1hAq_pu1okA9x39nSeE2FPrQaV4BpdzBAtfbLArrqVcDmRw906fZRWcbh2q1AM1kF'
});

module.exports = {
    name: "error",
    async execute(err) {
        console.log(err)
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Discord API error")
            .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
            .setDescription(`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();
        return webhook.send({ embeds: [embed] })
    }
}