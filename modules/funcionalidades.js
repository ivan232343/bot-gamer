const { consoleLog } = require("./necesarios");
const { sp_validate_tktpendiente } = require("./peticionesbd");

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
    },
    validarTicketPendiente: async function (documento) {
        const CHECK_PENDIENTE = await sp_validate_tktpendiente(documento);
        consoleLog("", CHECK_PENDIENTE)
        let e = { msg: "No se encontraron resultados", find: false }
        if (!CHECK_PENDIENTE.find) return e;
        const FECHA_APERTURA = toUTC(CHECK_PENDIENTE.f.time_create)
        const STR_APERTURA = `${(FECHA_APERTURA.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_APERTURA.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_APERTURA.getFullYear()} ${(FECHA_APERTURA.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCSeconds()).toString().padStart(2, '0')}`
        const FECHA_ATENCION = CHECK_PENDIENTE.f.time_init !== null ? toUTC(CHECK_PENDIENTE.f.time_init) : ""
        const STR_CREADO = FECHA_ATENCION !== "" ? `${(FECHA_ATENCION.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_ATENCION.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_ATENCION.getFullYear()} ${(FECHA_ATENCION.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCSeconds()).toString().padStart(2, '0')}` : ""

        return {
            data: { content: `Se valida ticket pendiente en <#${CHECK_PENDIENTE.f.channel_id}> creado el  ${STR_APERTURA}\n${CHECK_PENDIENTE.f["adviser_i-id_init"] !== null ? `Siendo atendido por <@${CHECK_PENDIENTE.f["adviser_i-id_init"]}> desde ${STR_CREADO} ` : ""}`, ephemeral: true }, find: true
        };
    },
}