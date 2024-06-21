/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo donde se encuentra los botones para los embeds, un generador de select y un borrador de roles
 */
const { StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { URL_UTILES } = require('../json/recursos.json');
const { CATEGORIA } = require("../json/motivos.json")
const { consoleLog } = require("./necesarios");
module.exports = {
    adsWinBtns: function (argT = "") {
        return {
            first: new ButtonBuilder()
                .setDisabled(true)
                .setLabel("Generar Ticket ->")
                .setStyle(ButtonStyle.Danger)
                .setCustomId("none"),
            upgrade: new ButtonBuilder()
                .setCustomId(`upgrade-gamer_${argT}`)
                .setEmoji('🎮')
                .setLabel('LevelUp to Gamer')
                .setStyle(ButtonStyle.Success),
            web: new ButtonBuilder()
                .setLabel('Ir a win.pe')
                .setEmoji('🌐')
                .setStyle(ButtonStyle.Link)
                .setURL(URL_UTILES.web),
            wsp: new ButtonBuilder()
                .setLabel("Whatsapp")
                .setEmoji('📞')
                .setStyle(ButtonStyle.Link)
                .setURL(URL_UTILES.wsp),
            initTicket: new ButtonBuilder()
                .setCustomId('create-ticket')
                .setLabel('Con otro documento')
                .setStyle(ButtonStyle.Secondary),
            initTicketWithPrev: new ButtonBuilder()
                .setCustomId("create-ticket-with-validate")
                .setLabel("Generar ticket")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🤖'),
            validate: new ButtonBuilder()
                .setCustomId('validation')
                .setEmoji('🔰')
                .setLabel('Ingresar Documento')
                .setStyle(ButtonStyle.Primary),
            previusRegisterDoc: new ButtonBuilder()
                .setCustomId('previus-reg')
                .setLabel('Con mi documento')
                .setStyle(ButtonStyle.Success),
            validateAsesor: new ButtonBuilder()
                .setCustomId('validation-asesor')
                .setEmoji('👨‍💻')
                .setLabel('Registrarse')
                .setStyle(ButtonStyle.Success),
            sendfeed: new ButtonBuilder()
                .setCustomId('initfeedback')
                .setLabel("Enviar feedback")
                .setStyle(ButtonStyle.Primary),
            sendEncuesta: new ButtonBuilder()
                .setURL(URL_UTILES.encuesta)
                .setLabel("Realizar encuesta")
                .setStyle(ButtonStyle.Link)
        }
    },
    ticketbtns: function (id = "0") {
        return {
            lock: new ButtonBuilder()
                .setLabel('Pausar atencion')
                .setCustomId(`lock_${id}`) /**interaction.user.id */
                .setEmoji('🔒')
                .setStyle(ButtonStyle.Primary),
            unlock: new ButtonBuilder()
                .setLabel('Reanudar atencion')
                .setCustomId(`unlock_${id}`)/**interaction.user.id */
                .setEmoji('🔓')
                .setStyle(ButtonStyle.Primary),
            close: new ButtonBuilder()
                .setLabel('Cerrar atencion')
                .setCustomId(`close-ticket_${id}`)
                .setEmoji('❌')
                .setStyle(ButtonStyle.Danger),
            detallarProblema: new ButtonBuilder()
                .setLabel('Detallar problema')
                .setEmoji('🔎')
                .setStyle(ButtonStyle.Danger)
                .setCustomId(`problem_${id}`)/**dni */,
            upgrade: new ButtonBuilder()
                .setLabel('Upgrade')
                .setEmoji('⬆️')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`upgrade-ticket_${id}`)/**dni */,
            catchTicket: new ButtonBuilder()
                .setLabel('Atrapar ticket')
                .setEmoji('👈')
                .setStyle(ButtonStyle.Success)
                .setCustomId(`catch-ticket_${id}`)/**id del canal y dni del cliente */,
        }
    },
    SelectMotivo: function () {
        let categoriasBuild = [];
        Object.getOwnPropertyNames(CATEGORIA).forEach(e => {
            const TEMP_CATEGORIA = new StringSelectMenuOptionBuilder()
                .setDescription(CATEGORIA[e].Descripcion)
                .setLabel(CATEGORIA[e].Label)
                .setValue(CATEGORIA[e].value)
                .setEmoji(CATEGORIA[e].emoji)
            return TEMP_CATEGORIA
        })
        return categoriasBuild;
    },
    removeUserRoles: async ({ interaction }) => {
        const ROLES = {
            noValidationRole: interaction.member.guild.roles.cache.find((r) => r.name === "Sin validar"),
            gamerWinRole: interaction.member.guild.roles.cache.find((r) => r.name === "Gamer Win"),
            regularRole: interaction.member.guild.roles.cache.find((r) => r.name === "Regular")
        }
        return new Promise((resolve) => {
            Object.getOwnPropertyNames(ROLES).forEach(async ele => {
                interaction.member.roles.remove(ROLES[ele])
                    .then(() => {
                        consoleLog(`Se ha quitado el rol "${ROLES[ele].name}" a ${interaction.member.user.tag}.`);
                    }).catch((error) => {
                        consoleLog(`Error al quitar el rol:`, error);
                    });
            })
            resolve(ROLES)
        })
    }
}