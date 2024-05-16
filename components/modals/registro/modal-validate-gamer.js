/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Luego de que el usuario coloque su dni y presione el boton de enviar dentro del modal
 * se empezara con la validacion, aqui lo que primero se esta haciendo es si lo que se a ingresado es
 * un numero, si en caso lo fuese, se continua a validar si ya tiene un dni registrado o si el dni fue 
 * registrado anteriormente, si se valida que realmente no hay registro tanto de su interaction ID como 
 * el DNI ingresado se procede con el registro, luego del registro se valida si el cliente tiene servicio 
 * gamer, y se le asigna el rol segun como corresponda, (no tiene gamer= regular, tiene gamer = gamer win)
 */
const { ActionRowBuilder, AttachmentBuilder } = require("discord.js");
const { sp_validate_interaction_doc, sp_register_interaction_doc, sp_validate_serv_gamer } = require("../../../modules/peticionesbd");
const { adsWinBtns, removeUserRoles } = require("../../../modules/builder");
const { assignWinGamer, assignRegular, errorDuplicado } = require("../../../modules/embeds");

module.exports = {
    data: { name: 'modal-validate-gamer' },
    async execute(interaction) {
        const DNI_CLIENTE = interaction.fields.getTextInputValue("dnicliente")
        if (!/[0-9]/.test(DNI_CLIENTE)) return await interacion.reply({ content: "Tipo de dato invalido, pofavor intentelo nuevamente con numeros", ephemeral: true }).then(msg => { setTimeout(() => { msg.delete() }, 2500) })
        const DATA_SEND = { interaction: interaction.user.id, dni: DNI_CLIENTE }
        const VALIDAR_DUPLICADO = await sp_validate_interaction_doc(DATA_SEND);
        console.log(VALIDAR_DUPLICADO)
        if (!VALIDAR_DUPLICADO.execute) return await interaction.reply({ content: ``, embeds: [errorDuplicado({ interaction: interaction.user.id, mode: 1 })], ephemeral: true });
        if (VALIDAR_DUPLICADO.f.validate === 1) return await interaction.reply({ content: ``, embeds: [errorDuplicado({ interaction: interaction.user.id, mode: VALIDAR_DUPLICADO.f.ret_interaction >= 1 ? 2 : 1 })], ephemeral: true });
        const REGISTRAR_USUARIO = await sp_register_interaction_doc(DATA_SEND)
        if (!REGISTRAR_USUARIO.execute) return await interaction.editReply({ content: "Ocurrio un error intentelo mas adelante", });
        const VALIDAR_SERVICIO_GAMER = await sp_validate_serv_gamer(DNI_CLIENTE);
        await removeUserRoles({ interaction }).then(async roles => {
            await interaction.reply({ content: "Espere un momento...", ephemeral: true })
            setTimeout(async () => {
                if (VALIDAR_SERVICIO_GAMER.find && VALIDAR_SERVICIO_GAMER.f.validate === 1) {
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