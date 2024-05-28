/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo que hace las peticiones de la BD y les da un tratamiento previo
 */
const { local, remote } = require("./conectbd")

module.exports = {

    sp_close_ticket: async (query = { interaction, cerrar, id }) => {
        const peticion = await local(`CALL sp_close_ticket('${query.interaction}', '${query.cerrar}', '${query.id}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Cerrado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.cerrar}', '${query.id}'`, execute: false, error: res })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_init_ticket: async (query = { channel, dni, motivo, problema, interaction }) => {
        const peticion = await local(`CALL sp_init_ticket('${query.channel}','${query.dni}','${query.motivo}','${query.problema}','${query.interaction}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Iniciado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.channel}', '${query.dni}', '${query.motivo}', '${query.problema}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_register_interaction_doc: async (query = { interaction, dni }) => {
        const peticion = await local(`call \`sp_register_interaction_doc\`('${query.interaction}','${query.dni}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Iniciado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.dni}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_update_ticket_atention: async (query = { interaction, currentid }) => {
        const peticion = await local(`call \`sp_update_ticket-atention\`('${query.interaction}','${query.currentid}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados.affectedRows >= 1 ? { msg: "Iniciado correctamente", execute: true, data: res.resultados } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.currentid}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_validate_interaction_doc: async (query = { interaction, dni }) => {
        const peticion = await local(`CALL \`sp_validate_interaction-doc\`('${query.dni}','${query.interaction}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], execute: true } : { f: `No se encontro datos para '${query.interaction}', '${query.dni}'`, execute: false } : { f: `Ocurrio un error: ${res.errores.code} /  '${query.interaction}', '${query.dni}'`, execute: false, error: res })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_validate_tktpendiente: async (query) => {
        const peticion = await local(`CALL sp_validate_tktpendiente('${query}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], find: true } : { f: `No se encontro datos para <@${query}>`, find: false } : { f: `Ocurrio un error: ${res.errores.code} / ${query}`, find: false })
            .catch(res => { return { msg: "Ocurrio un error interno", find: false, code: res } })
        return peticion
    },

    sp_validate_serv_gamer: async (query) => {
        const peticion = await remote(`CALL \`sp_validate_serv-gamer\`('${query}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], find: true } : { f: `No se encontro datos para <@${query}>`, find: false } : { f: `Ocurrio un error: ${res.errores.code} / ${query}`, find: false })
            .catch(res => { return { msg: "Ocurrio un error interno", find: false, code: res } })
        return peticion
    },
    sp_validate_gamer_to_init: async (query = { doc, namecl, planPicked }) => {
        const peticion = await remote(`CALL \`sp_validate_gamer\`('${query.namecl}','${query.doc}',${query.planPicked})`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], find: true } : { f: `No se encontro datos para <@${query}>`, find: false } : { f: `Ocurrio un error: ${res.errores.code} / ${query.doc},${query.namecl},${query.planPicked}`, find: false, error: res })
            .catch(res => { return { msg: "Ocurrio un error interno", find: false, code: res } })
        return peticion
    }
}

