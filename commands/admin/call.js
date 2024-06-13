/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: 
 * fecha: 
 * motivo: 
 * 
 */

const { consoleLog } = require("../../modules/necesarios")
const { SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const { ddd } = require("../../json/recursos.json")
const botones = require("../../modules/builder");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("call")
        .setDescription("inicializa un componente")
        .addSubcommand(childCommand => childCommand
            .setName("buttons")
            .setDescription("Inicia el panel de atencion de tickets gamer")
        ).addSubcommand(childCommand => childCommand
            .setName("embeds")
            .setDescription("Inicia el panel de validacion de los cliente")
        ),
    category: "admin",
    async execute(interaction) {
        consoleLog(`${interaction.user} uso el comando call`)
        const init = interaction.options.getSubcommand();

        return await interaction.reply("hola que hace " + ddd);


    }
}