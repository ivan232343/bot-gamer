const { EmbedBuilder, WebhookClient } = require('discord.js');
const { inspect } = require('util');
const webhook = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1210800600795582495/J85ZnniSqZEkFfVT3upjH1XOL6BIFSeVLHa-h29NTd3SGWeYVwBd2IprvMmrboJMM_yH'
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
// (Client) => { }