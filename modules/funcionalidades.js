/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo de funcionalidades del proyecto
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se agrego la funcion validarTicketPendiente
const { consoleLog } = require("./necesarios");
const { spValidateTicketPendiente } = require("./peticionesbd");
const { toUTC } = require("./utclocalconverter");

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
        const DATE = new Date(datetime);
        const LOCALTIME = DATE.getTime();
        const OFFSET = -5 * 60 * 60 * 1000;
        const UTCTIME = LOCALTIME + OFFSET;
        return new Date(UTCTIME);
    },
    validarTicketPendiente: async function (documento) {
        const CHECK_PENDIENTE = await spValidateTicketPendiente(documento);
        consoleLog("hay ticket pendiente:", CHECK_PENDIENTE)
        let objFind = { msg: "No se encontraron resultados", find: false }
        if (!CHECK_PENDIENTE.find) return objFind;
        const FECHA_APERTURA = toUTC(CHECK_PENDIENTE.f.time_create)
        const STR_APERTURA = `${(FECHA_APERTURA.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_APERTURA.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_APERTURA.getFullYear()} ${(FECHA_APERTURA.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_APERTURA.getUTCSeconds()).toString().padStart(2, '0')}`
        const FECHA_ATENCION = CHECK_PENDIENTE.f.time_init !== null ? toUTC(CHECK_PENDIENTE.f.time_init) : ""
        const STR_CREADO = FECHA_ATENCION !== "" ? `${(FECHA_ATENCION.getUTCDate()).toString().padStart(2, '0')}/${(FECHA_ATENCION.getUTCMonth() + 1).toString().padStart(2, '0')}/${FECHA_ATENCION.getFullYear()} ${(FECHA_ATENCION.getUTCHours()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCMinutes()).toString().padStart(2, '0')}:${(FECHA_ATENCION.getUTCSeconds()).toString().padStart(2, '0')}` : ""

        return {
            data: { content: `Se valida ticket pendiente en <#${CHECK_PENDIENTE.f.channel_id}> creado el  ${STR_APERTURA}\n${CHECK_PENDIENTE.f["adviser_i-id_init"] !== null ? `Siendo atendido por <@${CHECK_PENDIENTE.f["adviser_i-id_init"]}> desde ${STR_CREADO} ` : ""}`, ephemeral: true }, find: true
        };
    },
}