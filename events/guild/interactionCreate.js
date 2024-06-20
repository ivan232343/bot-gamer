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
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se añadio la funcion consoleLog() para gestionar errores y/o registros en el mismo discord
const { Events, EmbedBuilder, WebhookClient } = require("discord.js");
const { inspect } = require("util");
const { URL_UTILES } = require("../../json/recursos.json")
const { WEB_HOOCKS } = require("../../configdiscord.json");
const { consoleLog } = require("../../modules/necesarios");
const WH_CHANNEL_ERRORS = new WebhookClient({ url: WEB_HOOCKS.ch_errors });

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      try {
        const COMMAND = interaction.client.commands.get(interaction.commandName);
        if (!COMMAND) {
          consoleLog(`No command matching ${interaction.commandName} was found.`);
          return;
        }
        try {
          await COMMAND.execute(interaction, client);
        } catch (error) {
          consoleLog(`Error executing ${interaction.commandName}`);
          consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);
          const EMBED = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Discord API error")
            .setURL(URL_UTILES.discordjs_error)
            .setDescription(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();
          return WH_CHANNEL_ERRORS.send({ embeds: [EMBED] });
        }
      } catch (error) {
        consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);
        const EMBED = new EmbedBuilder()
          .setColor("Red")
          .setTitle("Discord API error")
          .setURL(URL_UTILES.discordjs_error)
          .setDescription(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
          .setTimestamp();
        return WH_CHANNEL_ERRORS.send({ embeds: [EMBED] }) && console.log(error);

      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const BUTTON = buttons.get(customId.split("_")[0]);
      if (!BUTTON) return new Error(`Este boton no tiene codigo`);
      try {
        await BUTTON.execute(interaction, client)
      } catch (error) {
        consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);
      }
    } else if (interaction.isModalSubmit()) {
      const { modals } = client;
      const { customId } = interaction;
      const MODAL = modals.get(customId.split("_")[0]);
      if (!MODAL) return new Error(`Este modal no tiene codigo`);
      try {
        await MODAL.execute(interaction, client)
      } catch (error) {
        consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selects } = client;
      const { customId } = interaction;
      const SELECT = selects.get(customId.split("_")[0]);
      if (!SELECT) return new Error(`Este select no tiene codigo`);
      try {
        await SELECT.execute(interaction, client)
      } catch (error) {
        consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);
      }
    }
    else {
      return;
    }
  },
};
