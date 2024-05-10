const { ActionRowBuilder } = require("discord.js");
const { sp_validate_interaction_doc, sp_register_interaction_doc, sp_validate_serv_gamer } = require("../../../modules/peticionesbd");
const { adsWinBtns, removeUserRoles } = require("../../../modules/builder");
const { assignWinGamer, assignRegular, errorDuplicado } = require("../../../modules/embeds");

module.exports = {
    data: {
        name: 'modal-validate-gamer'
    },
    async execute(interaction) {
        const dni = interaction.fields.getTextInputValue("dnicliente")
        if (/[0-9]/.test(dni)) {
            const data = { interaction: interaction.user.id, dni: dni }
            const validateDuplicado = await sp_validate_interaction_doc(data);
            console.log(validateDuplicado)
            if (validateDuplicado.find) {
                if (validateDuplicado.f.validate === 0) {
                    console.log('no se encontro duplicado. se procede')
                    const register = await sp_register_interaction_doc(data)
                    if (register.execute) {
                        const getValidateGamer = await sp_validate_serv_gamer(dni);
                        await removeUserRoles({ interaction }).then(async roles => {
                            await interaction.reply({ content: "Espere un momento...", ephemeral: true })

                            setTimeout(async () => {
                                console.log(getValidateGamer)
                                if (getValidateGamer.find && getValidateGamer.f.validate === 1) {
                                    await interaction.member.roles.add(roles.gamerWinRole)
                                        .then(async () => {
                                            console.log(`Se ha agregado el rol "${roles.gamerWinRole.name}" a ${interaction.member.user.tag}.`);
                                            await interaction.editReply({
                                                content: ``, embeds: [assignWinGamer({ interaction: interaction.user.id })],
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
                                            console.log(`Se ha agregado el rol "${roles.regularRole.name}" a ${interaction.member.user.tag}.`);
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
                } else {
                    if (validateDuplicado.f.ret_interaction === 1) {
                        await interaction.reply({
                            content: ``,
                            embeds: [errorDuplicado({ interaction: interaction.user.id, mode: 2 })],
                            ephemeral: true
                        });
                    } else {
                        await interaction.reply({
                            content: ``,
                            embeds: [errorDuplicado({ interaction: interaction.user.id, mode: 1 })],
                            ephemeral: true
                        });
                    }
                }
            } else {
                await interaction.reply({
                    content: ``,
                    embeds: [errorDuplicado({ interaction: interaction.user.id })],
                    ephemeral: true
                });
            }
        } else {
            await interaction.reply({ content: "Tipo de dato invalido, pofavor intentelo nuevamente con numeros", ephemeral: true })
                .then(msg => { setTimeout(() => { msg.delete() }, 2500) })
        }
    }
}