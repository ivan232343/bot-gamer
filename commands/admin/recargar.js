/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Comando que recarga el comando a escoger por si se realizan cambios
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables
const { SlashCommandBuilder } = require("discord.js");
const { consoleLog } = require("../../modules/necesarios");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("recarga")
        .setDescription("Reloads a command.")
        .addSubcommand(
            childCommand => childCommand
                .setName("comandos")
                .setDescription("Reload a command")
                .addStringOption((option) =>
                    option
                        .setName("command")
                        .setDescription("The command to reload.")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            childCommand => childCommand
                .setName("componentes")
                .setDescription("Recarga los componentes")
        )
    ,
    category: "admin",
    async execute(interaction) {
        const NAME_TO_RELOAD = interaction.options.getSubcommand();
        if (NAME_TO_RELOAD === "componentes") {
            const { commandsLoader, buttonLoader, modalLoader, selectLoader } = require("../../modules/Eventsloader");
            await consoleLog("reiniciando componentes")
            await interaction.reply({ ephemeral: true, content: "reiniciando componentes, por favor revise el canal de logs" })
            await commandsLoader(interaction.client);
            await buttonLoader(interaction.client);
            await modalLoader(interaction.client);
            await selectLoader(interaction.client);
            return await consoleLog("Reinicio completo")
        } else {
            const COMMAND_NAME = interaction.options
                .getString("command", true)
                .toLowerCase();
            const COMMAND = interaction.client.commands.get(COMMAND_NAME);

            if (!COMMAND) {
                return interaction.reply(`There is no command with name \`${COMMAND_NAME}\`!`);
            }

            delete require.cache[
                require.resolve(`../${COMMAND.category}/${COMMAND.data.name}.js`)
            ];

            try {
                interaction.client.commands.delete(COMMAND.data.name);
                const COMMAND_NEW = require(`../${COMMAND.category}/${COMMAND.data.name}.js`);
                interaction.client.commands.set(COMMAND_NEW.data.name, COMMAND_NEW);
                await interaction.reply(`Command \`${COMMAND_NEW.data.name}\` was reloaded!`);
            } catch (error) {
                console.error(error);
                await interaction.reply(
                    `There was an error while reloading a command \`${COMMAND.data.name}\`:\n\`${error.message}\``
                );
            }
        }

    },
};