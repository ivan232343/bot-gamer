const transcripts = require("discord-html-transcripts");
const { bkChats } = require("../../../json/canales.json");
const { get } = require('../../../modules/conectbd');
const { toUTC } = require('../../../modules/utclocalconverter');
const fs = require('fs');
const path = require('path');
const { ticketbtns } = require("../../../modules/builder");
const { ActionRowBuilder } = require("discord.js");
const { sp_close_ticket } = require("../../../modules/peticionesbd");
module.exports = {
    data: {
        name: 'cerrar-ticket'
    },
    async execute(interaction, client) {

        const closetkt = interaction.fields.getTextInputValue("idregistro");
        const currentID = interaction.customId.split("_")[1]

        if (/[A-Z]{2}-[0-9]{7,9}/.test(closetkt)) {
            const close = await sp_close_ticket({ interaction: interaction.user.id, cerrar: closetkt, id: currentID })
            if (close.execute) {
                const date = new Date();
                let time = toUTC(date)
                const channel = interaction.channel;
                const channelbk = await client.channels.cache.get(bkChats);
                const stringGenerate = await transcripts.createTranscript(channel, {
                    returnType: 'string'
                })
                try {
                    const OUT_DIR = `src/generate/chats/${close.data.documento}`;
                    // Construye la ruta hacia el archivo de salida
                    const nombreArchivo = `${closetkt}-${interaction.channel.id}-${(time.getUTCDate()).toString().padStart(2, '0')}-${(time.getUTCMonth() + 1).toString().padStart(2, '0')}-${time.getFullYear()}_${(time.getUTCHours()).toString().padStart(2, '0')}--${(time.getUTCMinutes()).toString().padStart(2, '0')}.html`; // Nombre del archivo HTML
                    if (!fs.existsSync(OUT_DIR)) {
                        fs.mkdirSync(OUT_DIR);
                    }
                    const rutaArchivo = path.join(OUT_DIR, nombreArchivo);
                    const writeStream = fs.createWriteStream(rutaArchivo);

                    // Escribe el contenido HTML en el archivo
                    console.log(writeStream.write(stringGenerate));

                    // Cierra el flujo de escritura
                    writeStream.end();
                    console.log(close.data.documento)
                    await channelbk.send({
                        content: `Backup del canal ${channel.name} cerrado el dia ${(time.getUTCDate()).toString().padStart(2, '0')} del ${(time.getUTCMonth() + 1).toString().padStart(2, '0')} del año ${time.getFullYear()} a las ${(time.getUTCHours()).toString().padStart(2, '0')}:${(time.getUTCMinutes()).toString().padStart(2, '0')}:${(time.getUTCSeconds()).toString().padStart(2, '0')} `,
                        components: [new ActionRowBuilder().addComponents(ticketbtns(`${close.data.documento}/${nombreArchivo.split(".")[0]}`).closeurlticket)]
                    });
                    await interaction.reply({ content: `El archivo se genero Correctamente en ${rutaArchivo}`, ephemeral: true })
                    return interaction.editReply({ content: `El canal se cierrara en 5 seg`, ephemeral: true })
                        .then(() => {
                            setTimeout(() => {
                                interaction.channel.delete();
                            }, 5000)
                        })
                } catch (error) {
                    console.error('Error al guardar el archivo:', error);
                }
            } else {
                await interaction.reply({ content: `${interaction.user} -> ${close.msg}`, ephemeral: true })
            }
        } else {
            await interaction.reply({ content: "El ticket ingresado no cumple con la estructura AT-XXXXXXX", ephemeral: true })
        }
    }
}
