/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo que hace las peticiones de la BD y les da un tratamiento previo
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se añadio la funciones local y remote
const { LOCAL, REMOTE } = require("./conectbd")

module.exports = {

    spCerrarTicket: async (query = { interaction, cerrar, id }) => {
        const peticion = await LOCAL(`CALL spu_registro_atencion_c_tkt('${query.interaction}', '${query.cerrar}', '${query.id}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Cerrado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.cerrar}', '${query.id}'`, execute: false, error: res })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    spIniciarTicket: async (query = { channel, dni, motivo, problema, interaction }) => {
        const peticion = await LOCAL(`CALL spi_registro_atencion_i_tkt('${query.channel}','${query.dni}','${query.motivo}','${query.problema}','${query.interaction}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Iniciado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.channel}', '${query.dni}', '${query.motivo}', '${query.problema}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    spRegisterInteraccionDocumento: async (query = { interaction, dni, nombre }) => {
        const peticion = await LOCAL(`call \`spdis_user_dni_p_doc_discid\`('${query.interaction}','${query.dni}','${query.nombre}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Iniciado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.dni}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    spUpdateAtencionTicket: async (query = { interaction, currentid }) => {
        const peticion = await LOCAL(`call \`spu_registro_atencion_utktat\`('${query.interaction}','${query.currentid}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados.affectedRows >= 1 ? { msg: "Iniciado correctamente", execute: true, data: res.resultados } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.currentid}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    spValidateInteraccionDocumento: async (query = { interaction, dni }) => {
        const peticion = await LOCAL(`CALL \`sps_user_dni_v_discid_doc\`('${query.dni}','${query.interaction}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], execute: true } : { f: `No se encontro datos para '${query.interaction}', '${query.dni}'`, execute: false } : { f: `Ocurrio un error: ${res.errores.code} /  '${query.interaction}', '${query.dni}'`, execute: false, error: res })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    spValidateTicketPendiente: async (query) => {
        const peticion = await LOCAL(`CALL sps_registro_atencion_v_tp('${query}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], find: true } : { f: `No se encontro datos para <@${query}>`, find: false } : { f: `Ocurrio un error: ${res.errores.code} / ${query}`, find: false })
            .catch(res => { return { msg: "Ocurrio un error interno", find: false, code: res } })
        return peticion
    },
    spValidateGamer: async (query = { doc, namecl, planPicked }) => {
        const peticion = await REMOTE(`CALL \`sps_usuarios_gamer_discord_vg\`('${query.namecl}','${query.doc}',${query.planPicked})`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], find: true } : { f: `No se encontro datos para ${query}`, find: false } : { f: `Ocurrio un error: ${res.errores.code} / ${query.doc},${query.namecl},${query.planPicked}`, find: false, error: res })
            .catch(res => { return { msg: "Ocurrio un error interno", find: false, code: res } })
        return peticion
    }
}

