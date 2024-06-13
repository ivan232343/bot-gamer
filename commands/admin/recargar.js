/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Comando que recarga el comando a escoger por si se realizan cambios
 */
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
        const init = interaction.options.getSubcommand();
        if (init === "componentes") {
            const { commandsLoader, buttonLoader, modalLoader, selectLoader } = require("../../modules/Eventsloader");
            await consoleLog("reiniciando componentes")
            await interaction.reply({ ephemeral: true, content: "reiniciando componentes, por favor revise el canal de logs" })
            await commandsLoader(interaction.client);
            await buttonLoader(interaction.client);
            await modalLoader(interaction.client);
            await selectLoader(interaction.client);
            return await consoleLog("Reinicio completo")
        } else {
            const commandName = interaction.options
                .getString("command", true)
                .toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return interaction.reply(`There is no command with name \`${commandName}\`!`);
            }

            delete require.cache[
                require.resolve(`../${command.category}/${command.data.name}.js`)
            ];

            try {
                interaction.client.commands.delete(command.data.name);
                const newCommand = require(`../${command.category}/${command.data.name}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
            } catch (error) {
                console.error(error);
                await interaction.reply(
                    `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
                );
            }
        }

    },
};