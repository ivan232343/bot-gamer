/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Valida si las preguntas de seguridad son las correctas, si en caso las son, entonces se 
 * estaria procediendo con finalizar el registro y que lo intente nuevamente
 */
const { ActionRowBuilder, AttachmentBuilder } = require('discord.js')

const { sp_validate_gamer_to_init, sp_register_interaction_doc } = require('../../../modules/peticionesbd');
const { adsWinBtns, removeUserRoles } = require('../../../modules/builder');
const { assignWinGamer, assignRegular } = require('../../../modules/embeds');
module.exports = {
    data: {
        name: 'validate-service-onregistro'
    },
    async execute(interaction) {
        const GET_DATA = interaction.customId.split("_")
        const DATA_RES = { doc: GET_DATA[1], namecl: GET_DATA[2].replace(/-/g, " ").toUpperCase(), planPicked: interaction.values[0] }
        const REGISTRAR_USUARIO = await sp_register_interaction_doc({ dni: DATA_RES.doc, interaction: interaction.user.id })
        const CHECK_GAMER = await sp_validate_gamer_to_init(DATA_RES)
        if (!REGISTRAR_USUARIO.execute) return await interaction.reply({ content: "Ocurrio un error intentelo mas adelante", });
        await removeUserRoles({ interaction }).then(async roles => {
            await interaction.reply({ content: "Espere un momento...", ephemeral: true })
            console.log(CHECK_GAMER);
            setTimeout(async () => {
                if (CHECK_GAMER.find && CHECK_GAMER.f.validate === 1) {
                    await interaction.member.roles.add(roles.gamerWinRole)
                        .then(async () => {
                            const IMAGE_BUILD = new AttachmentBuilder("src/img/eseciales/logowingamer.png")
                            await interaction.editReply({
                                content: ``,
                                files: [IMAGE_BUILD],
                                embeds: [assignWinGamer({ interaction: interaction.user.id })]
                            });
                        })
                        .catch(async (error) => {
                            console.error("Error al agregar el rol:", error);
                            await interaction.editReply({
                                content: "Ocurrio un error intentelo mas adelante",
                            });
                        });
                } else {
                    await interaction.member.roles.add(roles.regularRole)
                        .then(async () => {
                            await interaction.editReply({
                                content: ``,
                                embeds: [assignRegular({ interaction: interaction.user.id })],
                                components: [new ActionRowBuilder().addComponents(adsWinBtns().web, adsWinBtns().wsp)]
                            });
                        })
                        .catch(async (error) => {
                            console.error("Error al agregar el rol:", error);
                            await interaction.editReply({
                                content: "Ocurrio un error intentelo mas adelante",
                            });
                        });
                }
            }, 2500)
        })

    }
}