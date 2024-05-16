/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo de funcionalidades del proyecto
 */
module.exports = {
    dividirArray: (array, tamanioGrupo) => {
        let resultado = [];
        for (let i = 0; i < array.length; i += tamanioGrupo) {
            let grupo = array.slice(i, i + tamanioGrupo);
            resultado.push(grupo);
        }
        return resultado;
    },
    toUTC: function (datetime) {
        const date = new Date(datetime);
        // Obtener la hora local
        const localTime = date.getTime();
        // Obtener la diferencia de tiempo en milisegundos
        const offset = -5 * 60 * 60 * 1000;
        // Calcular la hora UTC -5:00
        const utcTime = localTime + offset;
        // Crear una nueva fecha a partir de la hora UTC -5:00
        return new Date(utcTime);
    }
}