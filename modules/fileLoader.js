/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo encargado de cargar los archivos para los demas modulos
 */
const { glob } = require("glob");
const { promisify } = require('util');
const proGlob = promisify(glob);

module.exports = {
    loadFiles: async function (dirName) {
        const Files = await proGlob(
            `${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`
        );
        Files.forEach(file => delete require.cache[require.resolve(file)]);
        return Files
    }
}