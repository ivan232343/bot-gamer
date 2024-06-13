/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo donde estan los cargadores de los eventos del proyecto
 */
const { loadFiles } = require('../modules/fileLoader');
const { consoleLog } = require('./necesarios');
module.exports = {
    commandsLoader: async function (client) {
        await client.commands.clear();
        const Files = await loadFiles("commands")
        Files.forEach(async (file) => {
            const command = require(file);
            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command)
            } else {
                consoleLog(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`)
            }
        })
    },
    eventsLoader: async function (client) {
        await client.events.clear();
        const FilesGuild = await loadFiles("events/guild");
        const FilesServer = await loadFiles("events/server");
        FilesGuild.forEach(async (file) => {
            const event = require(file);
            const execute = (...args) => event.execute(...args, client)
            try {
                if (event.once) {
                    client.once(event.name, execute);
                } else {
                    client.on(event.name, execute);
                }
            } catch (error) {
                consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);

            }
        });
        FilesServer.forEach(async (files) => {
            const event = require(files);
            try {
                if (event.once) {
                    process.once(event.name, (...args) => event.execute(...args));
                } else {
                    // console.log('----', event.name, '----')
                    process.on(event.name, (...args) => event.execute(...args));
                }
            } catch (error) {
                await consoleLog(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``);

            }
        })

    },
    buttonLoader: async function (client) {
        await client.buttons.clear();
        const Files = await loadFiles("components/Buttons");
        Files.forEach((file) => {
            const button = require(file);
            client.buttons.set(button.data.name, button)
        })
        return await consoleLog("Button Loaded")
    },
    modalLoader: async function (client) {
        await client.modals.clear();
        const Files = await loadFiles("components/modals");
        Files.forEach((file) => {
            const modal = require(file);
            client.modals.set(modal.data.name, modal)
        })
        return await consoleLog("Modals Loaded")
    },
    selectLoader: async function (client) {
        await client.selects.clear();
        const Files = await loadFiles("components/selects");
        Files.forEach((file) => {
            const select = require(file);
            client.selects.set(select.data.name, select)
        })
        return await consoleLog("Selects Loaded")
    }

}