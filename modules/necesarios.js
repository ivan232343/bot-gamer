const { CH_LOG_WH } = require("../json/recursos.json");
const { WebhookClient } = require("discord.js");
const webhook = new WebhookClient({ url: CH_LOG_WH });
const { inspect } = require('util');
module.exports = {
    consoleLog: async function (text, err) {
        await webhook.send(`${text}\n${err ? "`\`\`\`" + inspect(err, { depth: 4, showHidden: true, maxArrayLength: 3, maxStringLength: 1800 }) + "\`\`\`" : ""}`)
    },

}