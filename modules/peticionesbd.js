const { get } = require("./conectbd")

module.exports = {
    sp_read_dnixmw: async (query) => {
        const peticion = await get(`CALL sp_read_dnixmw('${query.replace(/\s/g, '%').replace(/\W?[^A-Za-z0-9%]/g, '')}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { h: res.columnas[0], f: res.resultados[0] } : `No se encontro datos para ${query}` : `Ocurrio un error: ${res.errores.code} / ${query}`)
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_read_num: async (query) => {
        const peticion = await get(`CALL sp_read_num('${query.replace(/\s/g, '%').replace(/\W?[^A-Za-z0-9%]/g, '')}');`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0] } : `no se encuentra datos con la busqueda de \`\`${query}\`\`, verifique que este bien escrito` : `Ocurrio un error: ${res.errores.code} / ${query}`)
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_get_last_update: async (query) => {
        const peticion = await get(`CALL sp_get_last_update('${query.replace(/\s/g, '%').replace(/\W?[^A-Za-z0-9%]/g, '')}');`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0] } : `No se encontro datos para ${query}` : `Ocurrio un error: ${res.errores.code} / ${query}`)
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_uptatention_ticket: async (query = { interaction, id }) => {
        const peticion = await get(`CALL sp_uptatention_ticket('${query.interaction}', '${query.id}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados.affectedRows >= 1 ? { msg: "Actualizado correctamente", execute: true } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / ${query.interaction} /${query.id}`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_get_discordid_doc: async (query) => {
        const peticion = await get(`CALL sp_get_discordid_doc('${query}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0] } : `<@${query}>, al parecer usted no paso por <#1221722912868794383> para registrarse en nuestros sistemas, le recomendamos que se pueda registrar para brindarle soporte` : `Ocurrio un error: ${res.errores.code} / ${query}`)
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_validate_gamer: async (query) => {
        const peticion = await get(`CALL sp_validate_gamer('${query}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], find: true } : { f: `No se encontro datos para <@${query}>`, find: false } : { f: `Ocurrio un error: ${res.errores.code} / ${query}`, find: false })
            .catch(res => { return { msg: "Ocurrio un error interno", find: false, code: res } })
        return peticion
    },
    sp_register_idxdoc: async (query = { interaction, dni }) => {
        const peticion = await get(`CALL sp_register_idxdoc('${query.interaction}','${query.dni}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados.affectedRows >= 1 ? { msg: "Registrado correctamente", execute: true } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / ${query.interaction} /${query.dni}`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_update_discordID_doc: async (query = { interaction, dni }) => {
        const peticion = await get(`CALL sp_update_discordID_doc('${query.interaction}','${query.dni}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados.affectedRows >= 1 ? { msg: "Actualizado correctamente", execute: true } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / ${query.interaction} /${query.dni}`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_close_ticket: async (query = { interaction, cerrar, id }) => {
        const peticion = await get(`CALL sp_close_ticket('${query.interaction}', '${query.cerrar}', '${query.id}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Cerrado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.cerrar}', '${query.id}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_init_ticket: async (query = { channel, dni, motivo, problema, interaction }) => {
        const peticion = await get(`CALL sp_init_ticket('${query.channel}','${query.dni}','${query.motivo}','${query.problema}','${query.interaction}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[1].affectedRows >= 1 ? { msg: "Iniciado correctamente", execute: true, data: res.resultados[0][0] } : { msg: `No se encontro ID o hubo algun error`, execute: false } : { msg: `Ocurrio un error: ${res.errores.code} / '${query.interaction}', '${query.cerrar}', '${query.id}'`, execute: false })
            .catch(res => { return { msg: "Ocurrio un error interno", execute: false, code: res } })
        return peticion
    },
    sp_validate_tktpendiente: async (query) => {
        const peticion = await get(`CALL sp_validate_tktpendiente('${query}')`)
            .then(res => typeof res.resultados !== 'undefined' ? res.resultados[0].length >= 1 ? { f: res.resultados[0][0], find: true } : { f: `No se encontro datos para <@${query}>`, find: false } : { f: `Ocurrio un error: ${res.errores.code} / ${query}`, find: false })
            .catch(res => { return { msg: "Ocurrio un error interno", find: false, code: res } })
        return peticion
    },
}