const { ActionRowBuilder } = require("discord.js");
const {
    sp_get_discordid_doc,
    sp_validate_gamer,
    sp_register_idxdoc,
    sp_update_discordID_doc
} = require("../../../modules/peticionesbd");
const { adsWinBtns, removeUserRoles } = require("../../../modules/builder");
const { assignWinGamer, assignRegular } = require("../../../modules/embeds");

module.exports = {
    data: {
        name: 'modal-validate-gamer'
    },
    async execute(interaction) {
        const dni = interaction.fields.getTextInputValue("dnicliente")
        if (/[0-9]/.test(dni)) {
            const existe = await sp_get_discordid_doc(interaction.user.id);
            const data = { interaction: interaction.user.id, dni: dni }
            const register = typeof existe.f === 'undefined' ? await sp_register_idxdoc(data) : await sp_update_discordID_doc(data);
            console.log(register, "here")
            const getValidateGamer = await sp_validate_gamer(dni);
            await removeUserRoles({ interaction }).then(async roles => {
                await interaction.reply({ content: "Espere un momento...", ephemeral: true })

                setTimeout(async () => {
                    if (getValidateGamer.find) {
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

        } else {
            await interaction.reply({ content: "Tipo de dato invalido, pofavor intentelo nuevamente con numeros", ephemeral: true })
                .then(msg => { setTimeout(() => { msg.delete() }, 2500) })
        }
    }

}