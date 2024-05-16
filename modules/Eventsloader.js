/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo donde estan los cargadores de los eventos del proyecto
 */
const fs = require("node:fs");
const path = require("node:path");
const { loadFiles } = require('../modules/fileLoader')
module.exports = {
    eventServerLoader: async function () {
        const eventsPathS = path.join(__dirname, "../events/server");
        const eventSFiles = fs
            .readdirSync(eventsPathS)
            .filter((file) => file.endsWith(".js"));
        for (const file of eventSFiles) {
            const filePath = path.join(eventsPathS, file);
            const event = require(filePath);
            try {
                if (event.once) {
                    process.once(event.name, (...args) => event.execute(...args));
                } else {
                    console.log('----', event.name, '----')
                    process.on(event.name, (...args) => event.execute(...args));
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    eventGuildLoader: async function (client) {
        const eventsPathG = path.join(__dirname, "../events/guild");
        const eventGFiles = fs
            .readdirSync(eventsPathG)
            .filter((file) => file.endsWith(".js"));
        for (const file of eventGFiles) {
            const filePath = path.join(eventsPathG, file);
            const event = require(filePath);
            try {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    console.log('----', event.name, '----')
                    client.on(event.name, (...args) => event.execute(...args));
                }
            } catch (error) {
                console.error(error)
            }
        }
    },
    commandsLoader: async function (client) {
        await client.commands.clear();
        const Files = await loadFiles("commands")
        Files.forEach((file) => {
            const command = require(file);
            console.log(`----- ${command.data.name} loaded -----`)
            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command)
            } else {
                console.log(
                    `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
                )
            }
        })
    },
    eventsLoader: async function (client) {
        await client.events.clear();
        const FilesGuild = await loadFiles("events/guild");
        const FilesServer = await loadFiles("events/server");
        FilesGuild.forEach((file) => {
            const event = require(file);
            const execute = (...args) => event.execute(...args, client)
            try {
                if (event.once) {
                    client.once(event.name, execute);
                } else {
                    console.log('----', event.name, '----')
                    client.on(event.name, execute);
                }
            } catch (error) {
                console.error(error)
            }
        });
        FilesServer.forEach((files) => {
            const event = require(files);
            try {
                if (event.once) {
                    process.once(event.name, (...args) => event.execute(...args));
                } else {
                    console.log('----', event.name, '----')
                    process.on(event.name, (...args) => event.execute(...args));
                }
            } catch (error) {
                console.error(error)
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
        return console.log("Button Loaded")
    },
    modalLoader: async function (client) {
        await client.modals.clear();
        const Files = await loadFiles("components/modals");
        Files.forEach((file) => {
            const modal = require(file);
            client.modals.set(modal.data.name, modal)
        })
        return console.log("Modals Loaded")
    },
    selectLoader: async function (client) {
        await client.selects.clear();
        const Files = await loadFiles("components/selects");
        Files.forEach((file) => {
            const select = require(file);
            client.selects.set(select.data.name, select)
        })
        return console.log("Selects Loaded")
    }

}