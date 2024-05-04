const { exportarRerpoteCto } = require("../../../modules/builder")

module.exports = {
    data: {
        name: 'xlsxexport'
    },
    async execute(interaction) {
        const ctoConsultado = interaction.customId.split("_")[1]
        await interaction.update("Guada esta buscando el archivo\nLos resultados son:")
        await interaction.followUp({ content: `Tu reporte esta cargando, Estará adjuntado en el mensaje principal...`, ephemeral: true })
        const exports = await exportarRerpoteCto(ctoConsultado)
        if (exports.execute) {
            interaction.editReply({
                content: `Guada tiene tu archivo listo\nLos resultados son:`,
                components: [],
                files: [{
                    attachment: `src/generate/reportes/reporte_cto_${typeof ctoConsultado !== 'object' ? ctoConsultado : 'multiple'}.xlsx`,
                    name: `reporte_cto_${typeof ctoConsultado !== 'object' ? ctoConsultado : 'multiple'}.xlsx`
                }]
            })
        } else {
            console.error('Error al exportar el reporte:', exports.motivo);
            interaction.editReply({ content: 'Hubo un error interno. Por favor, inténtalo de nuevo más tarde.' });

        }
    }
}