/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 17/05/2024
 * motivo: 
 * Luego de que el usuario coloque su dni y presione el boton de enviar dentro del modal
 * se empezara con la validacion, aqui lo que primero se esta haciendo es si lo que se a ingresado es
 * un numero, si en caso lo fuese, se continua a validar si ya tiene un dni registrado o si el dni fue 
 * registrado anteriormente, si se valida que realmente no hay registro tanto de su interaction ID como 
 * el DNI ingresado se procede con el registro, luego del registro se valida si el cliente tiene servicio 
 * gamer, y se le asigna el rol segun como corresponda, (no tiene gamer= regular, tiene gamer = gamer win)
 */
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { sp_validate_interaction_doc } = require("../../../modules/peticionesbd");
const { planes } = require('../../../json/motivos.json');
const { errorDuplicado } = require("../../../modules/embeds");

module.exports = {
    data: { name: 'modal-validate-gamer' },
    async execute(interaction) {
        const DNI_CLIENTE = interaction.fields.getTextInputValue("dnicliente");
        const NOMBRE_CLIENTE = interaction.fields.getTextInputValue("namecliente");
        if (!/[0-9]/.test(DNI_CLIENTE)) return await interacion.reply({ content: "Tipo de dato invalido, pofavor intentelo nuevamente con numeros", ephemeral: true }).then(msg => { setTimeout(() => { msg.delete() }, 2500) })
        const DATA_SEND = { interaction: interaction.user.id, dni: DNI_CLIENTE }
        const VALIDAR_DUPLICADO = await sp_validate_interaction_doc(DATA_SEND);
        console.log(VALIDAR_DUPLICADO)
        /*if (VALIDAR_DUPLICADO.execute) {return await interaction.reply({ content: ``, embeds: [errorDuplicado({ interaction: interaction.user.id, mode: 1 })], ephemeral: true });*/
        /*if (VALIDAR_DUPLICADO.f.validate === 1) { return await interaction.reply({ content: ``, embeds: [errorDuplicado({ interaction: interaction.user.id, mode: VALIDAR_DUPLICADO.f.ret_interaction >= 1 ? 2 : 1 })], ephemeral: true });*/
        const OPTIONS_SELECT = planes.map(el => {
            const CATEGORIA_TEMP = new StringSelectMenuOptionBuilder()
                .setLabel(el.label)
                .setValue(el.value)
                .setEmoji(el.emoji)
            return CATEGORIA_TEMP
        })

        const SELECT_MOTIVO = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(`validate-service-onregistro_${DNI_CLIENTE}_${NOMBRE_CLIENTE.replaceAll(" ", "-")}`)
                .setPlaceholder('Seleccione el plan que cuenta actualmente')
                .addOptions(OPTIONS_SELECT)
        )
        return await interaction.reply({
            content: `Genial <@${interaction.user.id}>, para terminar con el registro es necesario realizar una ultima validacion,\nPorfavor coloque el plan que tiene actualmente en su servicio`,
            ephemeral: true,
            components: [SELECT_MOTIVO]
        })

    }
}