const { Events, EmbedBuilder, WebhookClient } = require("discord.js");
const { inspect } = require("util");
const webhook = new WebhookClient({
  url: 'https://discord.com/api/webhooks/1237160113777807501/1UM1hAq_pu1okA9x39nSeE2FPrQaV4BpdzBAtfbLArrqVcDmRw906fZRWcbh2q1AM1kF'
});

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      try {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
          console.error(`No command matching ${interaction.commandName} was found.`);
          return;
        }

        try {
          await command.execute(interaction, client);
        } catch (error) {
          console.error(`Error executing ${interaction.commandName}`);
          console.error(error);
          const embed = new EmbedBuilder()
            .setColor("Red");
          embed
            .setTitle("Discord API error")
            .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
            .setDescription(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();
          return webhook.send({ embeds: [embed] });
        }
      } catch (error) {
        const embed = new EmbedBuilder()
          .setColor("Red");
        embed
          .setTitle("Discord API error")
          .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
          .setDescription(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
          .setTimestamp();
        return webhook.send({ embeds: [embed] }) && console.log(error);

      }
    } else if (interaction.isButton()) {
      // console.log(client)
      const { buttons } = client;
      const { customId } = interaction;
      // console.log(customId)
      const button = buttons.get(customId.split("_")[0]);
      if (!button) return new Error(`Este boton no tiene codigo`);
      try {
        await button.execute(interaction, client)
      } catch (error) {
        console.error(error)
      }
    } else if (interaction.isModalSubmit()) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId.split("_")[0]);
      if (!modal) return new Error(`Este modal no tiene codigo`);
      try {
        await modal.execute(interaction, client)
      } catch (error) {
        console.error(error)
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selects } = client;
      const { customId } = interaction;
      const select = selects.get(customId.split("_")[0]);
      if (!select) return new Error(`Este select no tiene codigo`);
      try {
        await select.execute(interaction, client)
      } catch (error) {
        console.error(error)
      }
    }
    else {
      return;
    }
  },
};
