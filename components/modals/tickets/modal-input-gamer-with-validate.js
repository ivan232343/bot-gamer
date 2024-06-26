/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modal para stackear la info ingresada por el usuario y generar el select de los planes,
 * para posteriormente validar si realmente es el usuario o titular del servicio
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables
const { ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require('discord.js');
const { PLANES } = require('../../../json/motivos.json');
module.exports = {
    data: { name: 'modal-input-gamer-with-validate' },
    async execute(interaction) {
        const DNI_CLIENTE = interaction.fields.getTextInputValue("dnicliente");
        const NOMBRE_CLIENTE = interaction.fields.getTextInputValue("namecliente");
        const OPTIONS_SELECT = PLANES.map(el => {
            const CATEGORIA_TEMP = new StringSelectMenuOptionBuilder()
                .setLabel(el.label)
                .setValue(el.value)
                .setEmoji(el.emoji)
            return CATEGORIA_TEMP
        })
        const SELECT_MOTIVO = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(`validate-service_${DNI_CLIENTE}_${NOMBRE_CLIENTE.replaceAll(" ", "-")}`)
                .setPlaceholder('Seleccione el plan que cuenta actualmente')
                .addOptions(OPTIONS_SELECT)
        )
        return await interaction.reply({
            content: `Paso 1. <@${interaction.user.id}> seleccione el plan que tienes actualmente.`,
            ephemeral: true,
            components: [SELECT_MOTIVO]
        })

    }
}