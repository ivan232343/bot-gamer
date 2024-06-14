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
const TRANSCRIPTS_TO_HTML = require("discord-html-transcripts");
const { CHANNEL_BACKUP_CHAT } = require("../../../json/canales.json");
const { toUTC } = require('../../../modules/utclocalconverter');
const fs = require('fs');
const path = require('path');
const { ticketbtns, adsWinBtns } = require("../../../modules/builder");
const { ActionRowBuilder } = require("discord.js");
const { sp_close_ticket } = require("../../../modules/peticionesbd");
const { consoleLog } = require("../../../modules/necesarios");
module.exports = {
    data: { name: 'cerrar-ticket' },
    async execute(interaction, client) {

        const TICKET_CRM = interaction.fields.getTextInputValue("idregistro");
        const CURRENT_ID_BD = interaction.customId.split("_")[1]

        if (!/[A-Z]{2}-[0-9]{7,9}/.test(TICKET_CRM)) return await interaction.reply({ content: "El ticket ingresado no cumple con la estructura AT-XXXXXXX", ephemeral: true })
        const CLOSE_PROCESS = await sp_close_ticket({ interaction: interaction.user.id, cerrar: TICKET_CRM, id: CURRENT_ID_BD })
        consoleLog("cerrar ticket data", CLOSE_PROCESS)
        if (CLOSE_PROCESS.execute) {
            const FECHA_NOW = new Date();
            let time = toUTC(FECHA_NOW)
            const CHANNEL_HERE = interaction.channel;
            const CHANNEL_BACKUP = await client.channels.cache.get(CHANNEL_BACKUP_CHAT);
            const HTML_GENERATE = await TRANSCRIPTS_TO_HTML.createTranscript(CHANNEL_HERE, { returnType: "string" })
            try {
                const OUT_DIR = `src/generate/chats/${CLOSE_PROCESS.data.document}`;
                const ARCHIVO_GENERDO_LABEL = `${TICKET_CRM}-${interaction.channel.id}-${(time.getUTCDate()).toString().padStart(2, '0')}-${(time.getUTCMonth() + 1).toString().padStart(2, '0')}-${time.getFullYear()}_${(time.getUTCHours()).toString().padStart(2, '0')}--${(time.getUTCMinutes()).toString().padStart(2, '0')}.html`; // Nombre del archivo HTML
                if (!fs.existsSync(OUT_DIR)) {
                    fs.mkdirSync(OUT_DIR);
                }
                const RUTA_ARCHIVO_GENERADO = path.join(OUT_DIR, ARCHIVO_GENERDO_LABEL);
                fs.writeFileSync(RUTA_ARCHIVO_GENERADO, HTML_GENERATE, { flag: 'w' });
                await CHANNEL_BACKUP.send({
                    content: `Backup del canal ${CHANNEL_HERE.name} cerrado el dia ${(time.getUTCDate()).toString().padStart(2, '0')} del ${(time.getUTCMonth() + 1).toString().padStart(2, '0')} del año ${time.getFullYear()} a las ${(time.getUTCHours()).toString().padStart(2, '0')}:${(time.getUTCMinutes()).toString().padStart(2, '0')}:${(time.getUTCSeconds()).toString().padStart(2, '0')} `,

                });
                consoleLog(`El archivo se genero Correctamente en ${RUTA_ARCHIVO_GENERADO}`)
                await interaction.channel.send({ content: `### Tu opinión es importante\nMe ayudaría conocer tu opinión sobre la atención que te acaba de brindar ${interaction.user}. Por favor, completa esta encuesta\n_**Este canal se cerrara automaticamente en 10 min.**_`, components: [new ActionRowBuilder().addComponents(adsWinBtns().sendEncuesta)] })

                const pinnedMessages = await interaction.channel.messages.fetchPinned();
                const primerMensajeAnclado = pinnedMessages.first();
                consoleLog("Primer mensaje anclado:", primerMensajeAnclado)
                const mensajeAncladoId = primerMensajeAnclado.id; // Reemplaza con el ID correcto
                const mensajeAnclado = await interaction.channel.messages.fetch(mensajeAncladoId);
                consoleLog("Mensaje anclado:", mensajeAnclado)
                await mensajeAnclado.edit({ components: [] });

                return interaction.reply({ content: `El canal se cerrara en 10 min`, ephemeral: true })
                    .then(() => {
                        setTimeout(() => {
                            interaction.channel.delete();
                        }, 600000)
                    })
            } catch (error) {
                consoleLog('Error al guardar el archivo:', error);
                await interaction.reply({ content: `Error al guardar el archivo`, ephemeral: true })
            }
        } else {
            await interaction.reply({ content: `${interaction.user} -> ${close.msg}`, ephemeral: true })
        }
    }
}
