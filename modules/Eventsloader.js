/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo donde estan los cargadores de los eventos del proyecto
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 correccion de variables/se añadio la funcion consoleLog() para seguimiento
const { loadFiles } = require('../modules/fileLoader');
const { consoleLog } = require('./necesarios');
module.exports = {
    commandsLoader: async function (client) {
        await client.commands.clear();
        const FILES = await loadFiles("commands")
        FILES.forEach(async (file) => {
            const COMMAND = require(file);
            if ("data" in COMMAND && "execute" in COMMAND) {
                client.commands.set(COMMAND.data.name, COMMAND)
            } else {
                consoleLog(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`)
            }
        })
    },
    eventsLoader: async function (client) {
        await client.events.clear();
        const FILES_GUILD = await loadFiles("events/guild");
        const FILES_SERVER = await loadFiles("events/server");
        FILES_GUILD.forEach(async (file) => {
            const EVENT = require(file);
            const execute = (...args) => EVENT.execute(...args, client)
            try {
                if (EVENT.once) {
                    client.once(EVENT.name, execute);
                } else {
                    client.on(EVENT.name, execute);
                }
            } catch (error) {
                consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);

            }
        });
        FILES_SERVER.forEach(async (files) => {
            const EVENT = require(files);
            try {
                if (EVENT.once) {
                    process.once(EVENT.name, (...args) => EVENT.execute(...args));
                } else {
                    // console.log('----', event.name, '----')
                    process.on(EVENT.name, (...args) => EVENT.execute(...args));
                }
            } catch (error) {
                await consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);

            }
        })

    },
    buttonLoader: async function (client) {
        await client.buttons.clear();
        const FILES = await loadFiles("components/Buttons");
        FILES.forEach((file) => {
            const BUTTON = require(file);
            client.buttons.set(BUTTON.data.name, BUTTON)
        })
        return await consoleLog("Button Loaded")
    },
    modalLoader: async function (client) {
        await client.modals.clear();
        const FILES = await loadFiles("components/modals");
        FILES.forEach((file) => {
            const MODAL = require(file);
            client.modals.set(MODAL.data.name, MODAL)
        })
        return await consoleLog("Modals Loaded")
    },
    selectLoader: async function (client) {
        await client.selects.clear();
        const FILES = await loadFiles("components/selects");
        FILES.forEach((file) => {
            const SELECT = require(file);
            client.selects.set(SELECT.data.name, SELECT)
        })
        return await consoleLog("Selects Loaded")
    }

}