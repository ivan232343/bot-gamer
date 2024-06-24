/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Valida si las preguntas de seguridad son las correctas, si en caso las son, entonces se 
 * estaria procediendo con finalizar el registro y que lo intente nuevamente
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se removieron funciones que no se usan / se actualizo a la normalizacion
const { AttachmentBuilder } = require('discord.js')
const { spValidateGamer, spRegisterInteraccionDocumento } = require('../../../modules/peticionesbd');
const { removeUserRoles } = require('../../../modules/builder');
const { assignWinGamer, assignRegular } = require('../../../modules/embeds');
const { consoleLog } = require('../../../modules/necesarios');
module.exports = {
    data: {
        name: 'validate-service-onregistro'
    },
    async execute(interaction) {
        const GET_DATA = interaction.customId.split("_")
        const DATA_RES = { doc: GET_DATA[1], namecl: GET_DATA[2].replace(/-/g, " ").toUpperCase(), planPicked: interaction.values[0] }
        const REGISTRAR_USUARIO = await spRegisterInteraccionDocumento({ dni: DATA_RES.doc, interaction: interaction.user.id, nombre: DATA_RES.namecl })
        consoleLog("", DATA_RES)
        consoleLog("", REGISTRAR_USUARIO)
        if (!REGISTRAR_USUARIO.execute) return await interaction.reply({ content: "Ocurrió un error intentelo mas adelante", ephemeral: true }) && consoleLog(`${interaction.user} intento usar validate-service-onregistro data registrada:\nintput\n\`\`\`${DATA_RES.doc}\`\`\` / \`\`\`${DATA_RES.namecl}\`\`\` / \`\`\`${DATA_RES.planPicked}\`\`\``);
        await removeUserRoles({ interaction }).then(async roles => {
            await interaction.reply({ content: "Espere un momento...", ephemeral: true })
            if (DATA_RES.planPicked === "0") return await interaction.member.roles.add(roles.regularRole).then(async () => { consoleLog("se asigno correctamente a: " + interaction.user) && await interaction.editReply({ content: "", embeds: [assignRegular({ interaction: interaction.user.id })], ephemeral: true }) }).catch(async (error) => { consoleLog("Error al agregar el rol a: " + interaction.user, error); await interaction.editReply({ content: "Ocurrio un error intentelo mas adelante", ephemeral: true }); })
            const CHECK_GAMER = await spValidateGamer(DATA_RES)
            consoleLog(CHECK_GAMER);
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
                            consoleLog("Error al agregar el rol:", error);
                            await interaction.editReply({
                                content: "Ocurrio un error intentelo mas adelante",
                                ephemeral: true
                            });
                        });
                } else {
                    await interaction.member.roles.add(roles.regularRole)
                        .then(async () => {
                            await interaction.editReply({
                                content: ``,
                                embeds: [assignRegular({ interaction: interaction.user.id })]
                            });
                        })
                        .catch(async (error) => {
                            consoleLog("Error al agregar el rol:", error);
                            await interaction.editReply({
                                content: "Ocurrio un error intentelo mas adelante",
                                ephemeral: true
                            });
                        });
                }
            }, 2500)
        })

    }
}