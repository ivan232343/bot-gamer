/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Despues de hacer click en el boton de cerrar ticket en el chat generado y colocar el id del ticket generado en CRM, 
 * se valida primero que el el ticket ingresado cumpla con el formato establecido, luego se guarda en base de datos
 * la interaction id del asesor, el id del ticket, y la hora que se estaria cerrando,
 * despues se genera la transcripcion del canal y guardarlo en un archivo .html dentro de "src/generate/chats/"
 * al finalizar con la transcripcion, se procede con el cierre del canal y el borrado del mismo
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables / se agrego la funcion console.log(), se agrego el envio a encuesta
const TRANSCRIPTS_TO_HTML = require("discord-html-transcripts");
const { CHANNELS } = require("../../../configdiscord.json");
const { toUTC } = require('../../../modules/utclocalconverter');
const FS = require('fs');
const PATH = require('path');
const { spCerrarTicket } = require("../../../modules/peticionesbd");
const { consoleLog } = require("../../../modules/necesarios");
const { adsWinBtns } = require("../../../modules/builder");
const { ActionRowBuilder } = require("discord.js");
module.exports = {
    data: { name: 'cerrar-ticket' },
    async execute(interaction, client) {
        await interaction.reply({ content: "Cerrando ticket...", ephemeral: true })
        const TICKET_CRM = interaction.fields.getTextInputValue("idregistro");
        const CURRENT_ID_BD = interaction.customId.split("_")[1]

        if (!/[A-Z]{2}-[0-9]{7,9}/.test(TICKET_CRM)) return await interaction.editReply({ content: "El ticket ingresado no cumple con la estructura AT-XXXXXXX", ephemeral: true })
        const CLOSE_PROCESS = await spCerrarTicket({ interaction: interaction.user.id, cerrar: TICKET_CRM, id: CURRENT_ID_BD })
        consoleLog("cerrar ticket data", CLOSE_PROCESS)
        if (CLOSE_PROCESS.execute) {
            await interaction.channel.send({ content: `### Tu opinión es importante\nMe ayudaría conocer tu opinión sobre la atención que te acaba de brindar ${interaction.user}. Por favor, completa esta encuesta`, components: [new ActionRowBuilder().addComponents(adsWinBtns().sendEncuesta)] })
            await interaction.channel.send({ content: "_**Este canal se cerrara automaticamente en 2 min.**_" })
            const FECHA_NOW = new Date();
            let time = toUTC(FECHA_NOW)
            const CHANNEL_HERE = interaction.channel;
            const CHANNEL_BACKUP = await client.channels.cache.get(CHANNELS.backup_chats);
            const HTML_GENERATE = await TRANSCRIPTS_TO_HTML.createTranscript(CHANNEL_HERE, { returnType: "string" })
            try {
                const OUT_DIR = `src/generate/chats/${CLOSE_PROCESS.data.document}`;
                const ARCHIVO_GENERDO_LABEL = `${TICKET_CRM}-${interaction.channel.id}-${(time.getUTCDate()).toString().padStart(2, '0')}-${(time.getUTCMonth() + 1).toString().padStart(2, '0')}-${time.getFullYear()}_${(time.getUTCHours()).toString().padStart(2, '0')}--${(time.getUTCMinutes()).toString().padStart(2, '0')}.html`; // Nombre del archivo HTML
                if (!FS.existsSync(OUT_DIR)) {
                    FS.mkdirSync(OUT_DIR);
                }
                const RUTA_ARCHIVO_GENERADO = PATH.join(OUT_DIR, ARCHIVO_GENERDO_LABEL);
                FS.writeFileSync(RUTA_ARCHIVO_GENERADO, HTML_GENERATE, { flag: 'w' });
                console.log("llego aca, times")
                const TIME_CREATE = CLOSE_PROCESS.data.time_create
                const TIME_TAKE = CLOSE_PROCESS.data.time_init
                const TIME_CLOSE = CLOSE_PROCESS.data.time_close

                const WAIT_TIME_MILISECONDS = Math.abs(TIME_CREATE - TIME_TAKE)
                const ATENCION_TIME_MILISECONDS = Math.abs(TIME_CLOSE - TIME_TAKE)

                const TIME_WAIT = WAIT_TIME_MILISECONDS / 1000 <= 60 ? WAIT_TIME_MILISECONDS / 1000 + " segundos" : Math.ceil(WAIT_TIME_MILISECONDS / (1000 * 60)) + " minutos";
                const TIME_ATENCION = Math.ceil(ATENCION_TIME_MILISECONDS / (1000 * 60)) <= 60 ? Math.ceil(ATENCION_TIME_MILISECONDS / (1000 * 60)) + " Minutos" : Math.ceil(ATENCION_TIME_MILISECONDS / (1000 * 60 * 60)) + " horas";

                await CHANNEL_BACKUP.send({
                    content: `## ${CHANNEL_HERE.name} 
                    - Fecha y hora de cierre \`${(time.getUTCDate()).toString().padStart(2, '0')} del ${(time.getUTCMonth() + 1).toString().padStart(2, '0')} del año ${time.getFullYear()} a las ${(time.getUTCHours()).toString().padStart(2, '0')}:${(time.getUTCMinutes()).toString().padStart(2, '0')}:${(time.getUTCSeconds()).toString().padStart(2, '0')}\`
                    - Creado por <@${CLOSE_PROCESS.data.user_id}>
                    - Atendido por <@${CLOSE_PROCESS.data.asesor_take}>
                    - Cerrado por <@${CLOSE_PROCESS.data.asesor_close}>
                    - Tiempo de espera: \`${TIME_WAIT}\`
                    - Tiempo de atencion: \`${TIME_ATENCION}\`
                    - Ticket asociado: \`${CLOSE_PROCESS.data.ticket_crm_assoc}\`
                    - Motivo de consulta: \`${CLOSE_PROCESS.data.motivo}\`
                    - Observaciones del cliente:\`\`\`${CLOSE_PROCESS.data.observaciones}\`\`\`
                    `,

                });
                consoleLog(`El archivo se genero Correctamente en ${RUTA_ARCHIVO_GENERADO}`)
                console.log("llego aca, guardar archivo")

                const PINNED_MESSAGES = await interaction.channel.messages.fetchPinned();
                const PRIMER_MENSAJE_ANCLADO = PINNED_MESSAGES.first();
                const MENSAJE_ANCLADO_ID = PRIMER_MENSAJE_ANCLADO.id;
                const MENSAJE_ANCLADO = await interaction.channel.messages.fetch(MENSAJE_ANCLADO_ID);
                await MENSAJE_ANCLADO
                    .edit({ components: [] })
                    .then(async () => {
                        console.log("llego aca, anclado")
                        await interaction.editReply({ content: `El canal se cerrara en 2 min`, ephemeral: true })
                            .then((msg) => {
                                console.log("llego aca, borrado de canal empezando", msg)
                                setTimeout(async () => {
                                    await interaction.channel.delete();
                                }, 120000)
                            }).catch((err) => console.log(err))
                    }).catch((err) => console.log(err));
            } catch (error) {
                consoleLog('Error al guardar el archivo:', error);
                await interaction.editReply({ content: `Error al guardar el archivo`, ephemeral: true })
            }
        } else {
            await interaction.editReply({ content: `${interaction.user} -> ${CLOSE_PROCESS.msg}`, ephemeral: true })
        }
    }
}
