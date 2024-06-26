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
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 correccion de variables / se añadio la funcion consoleLog
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { spValidateInteraccionDocumento } = require("../../../modules/peticionesbd");
const { PLANES } = require('../../../json/motivos.json');
const { errorDuplicado } = require("../../../modules/embeds");
const { consoleLog } = require("../../../modules/necesarios");

module.exports = {
    data: { name: 'modal-validate-gamer' },
    async execute(interaction) {
        const DNI_CLIENTE = interaction.fields.getTextInputValue("dnicliente");
        const NOMBRE_CLIENTE = interaction.fields.getTextInputValue("namecliente");
        if (!/[0-9]/.test(DNI_CLIENTE)) return await interacion.reply({ content: "Tipo de dato invalido, pofavor intentelo nuevamente con numeros", ephemeral: true }).then(msg => { setTimeout(() => { msg.delete() }, 2500) })
        const DATA_SEND = { interaction: interaction.user.id, dni: DNI_CLIENTE }
        const VALIDAR_DUPLICADO = await spValidateInteraccionDocumento(DATA_SEND);
        consoleLog(VALIDAR_DUPLICADO)
        if (VALIDAR_DUPLICADO.execute && VALIDAR_DUPLICADO.f.validate === 1 && VALIDAR_DUPLICADO.f.ret_doc > 0) return await interaction.reply({ content: ``, embeds: [errorDuplicado({ interaction: interaction.user.id, mode: 1 })], ephemeral: true });
        const LAST_OPT = new StringSelectMenuOptionBuilder()
            .setLabel("No tengo planes gamer")
            .setValue("0")
            .setEmoji("❌")
        const OPTIONS_SELECT = PLANES.map(el => {
            const CATEGORIA_TEMP = new StringSelectMenuOptionBuilder()
                .setLabel(el.label)
                .setValue(el.value)
                .setEmoji(el.emoji)
            return CATEGORIA_TEMP
        })
        OPTIONS_SELECT.push(LAST_OPT)
        consoleLog("", OPTIONS_SELECT)
        const SELECT_MOTIVO = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(`validate-service-onregistro_${DNI_CLIENTE}_${NOMBRE_CLIENTE.replace(/\s+/g, '-')}`)
                .setPlaceholder('Seleccione el plan que cuenta actualmente')
                .addOptions(OPTIONS_SELECT)
        )
        return await interaction.reply({
            content: `## ¡Genial, <@${interaction.user.id}>!\nPara terminar con el registro, realizaremos una última validación. Por favor, selecciona el plan WIN que tienes contratado.`,
            ephemeral: true,
            components: [SELECT_MOTIVO]
        })

    }
}