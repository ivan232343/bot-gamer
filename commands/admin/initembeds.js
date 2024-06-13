/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: 
 * fecha: 
 * motivo: 
 * 
 */

const { consoleLog } = require("../../modules/necesarios")
const { SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const emebeds = require("../../modules/embeds");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("initembeds")
        .setDescription("inicializa un componente")
        .addSubcommand(childCommand => childCommand
            .setName("atgamer")
            .setDescription("Inicia el panel de atencion de tickets gamer")
        ).addSubcommand(childCommand => childCommand
            .setName("regclients")
            .setDescription("Inicia el panel de validacion de los cliente")
        ),
    category: "admin",
    async execute(interaction) {

    }
}