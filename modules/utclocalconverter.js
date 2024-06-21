/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo de la funcion para convertir el tiempo a UTC
 */
module.exports = {
    toUTC: function (datetime) {
        const DATE = new Date(datetime);
        const LOCALTIME = DATE.getTime();
        const OFFSET = -5 * 60 * 60 * 1000;
        const UTCTIME = LOCALTIME + OFFSET;
        return new Date(UTCTIME);
    }
}