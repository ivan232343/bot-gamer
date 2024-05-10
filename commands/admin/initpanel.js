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
        ),
    category: "admin",
    async execute(interaction) {
        const init = interaction.options.getSubcommand();
        const insertar = []
        const componentes = [];
        if (init === "atgamer") {
            insertar.push(staticsEmbeds.CreateTicket)
            componentes.push(
                new ActionRowBuilder().addComponents(
                    adsWinBtns().first,
                    adsWinBtns().previusRegisterDoc,
                    adsWinBtns().initTicket,
                ),
                new ActionRowBuilder().addComponents(
                    adsWinBtns().web,
                    adsWinBtns().wsp
                ))
        } else if (init === "feedback") {
            insertar.push()
            componentes.push()
        }
        else {
            insertar.push(staticsEmbeds.validateUser)
            componentes.push(new ActionRowBuilder().addComponents(adsWinBtns().validate))
        }
        await interaction.channel.send({ embeds: insertar, components: componentes })
            .then(() => {
                interaction.reply({ content: "Enviado exitosamente", ephemeral: true })
            })
    }
}