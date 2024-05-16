/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Este evento es el que gestiona si un usuario envia un mensaje, 
 * presiona un boton, seleciona alguna opcion del select, etc.
 * primero se valida que tipo de interaccion es y dependiendo ello se estaria procesando 
 * segun el customId de la interaccion
 */

const { Events, EmbedBuilder, WebhookClient } = require("discord.js");
const { inspect } = require("util");
const { ch_webhook, url_utiles } = require("../../json/recursos.json")
const webhook = new WebhookClient({ url: ch_webhook });

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
            .setColor("Red")
            .setTitle("Discord API error")
            .setURL(url_utiles.discordjs_error)
            .setDescription(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();
          return webhook.send({ embeds: [embed] });
        }
      } catch (error) {
        const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("Discord API error")
          .setURL(url_utiles.discordjs_error)
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
