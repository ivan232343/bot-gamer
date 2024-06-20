/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * comando que envia el panel de ticket como una forma de inicializarlos, este comando se usara cuando se realicen 
 * cambios en la estructura del generador de tickets o validador
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables
const { consoleLog } = require("../../modules/necesarios")
const { SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const { adsWinBtns } = require("../../modules/builder");
const { staticsEmbeds } = require("../../modules/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("initpanel")
        .setDescription("Envia el panel de tickets")
        .addSubcommand(childCommand => childCommand
            .setName("atgamer")
            .setDescription("Inicia el panel de atencion de tickets gamer")
        ).addSubcommand(childCommand => childCommand
            .setName("regclients")
            .setDescription("Inicia el panel de validacion de los cliente")
        ).addSubcommand(childCommand => childCommand
            .setName("feedback")
            .setDescription("Inicia el panel de validacion de los cliente")
        ),
    category: "admin",
    async execute(interaction) {
        const PANEL_NAME = interaction.options.getSubcommand();
        consoleLog(`la opcion escogida es ${PANEL_NAME}`)
        const EMBED_PANEL = []
        const COMPONENTES_PANEL = [];
        if (PANEL_NAME === "atgamer") {
            EMBED_PANEL.push(staticsEmbeds.CreateTicket)
            COMPONENTES_PANEL.push(
                new ActionRowBuilder().addComponents(
                    adsWinBtns().initTicketWithPrev,
                ),
                new ActionRowBuilder().addComponents(
                    adsWinBtns().web,
                    adsWinBtns().wsp
                ))
        }
        else if (PANEL_NAME === "feedback") {
            EMBED_PANEL.push(staticsEmbeds.feedback)
            COMPONENTES_PANEL.push(new ActionRowBuilder().addComponents(adsWinBtns().sendfeed))

        } else {
            EMBED_PANEL.push(staticsEmbeds.validateUser)
            COMPONENTES_PANEL.push(new ActionRowBuilder().addComponents(adsWinBtns().validate))
        }
        await interaction.channel.send({ embeds: EMBED_PANEL, components: COMPONENTES_PANEL })
            .then(() => {
                interaction.reply({ content: "Enviado exitosamente", ephemeral: true })
                consoleLog(`${interaction.user} uso el comando initpanel/${PANEL_NAME} `)
            })
    }
}