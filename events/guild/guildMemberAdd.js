/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Evento que gestiona quien entra al servidor, envia un mensaje tipo "embed" al canal de #bienvenidas
 * con una imagen generada
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigio las constantes/se realizo correcciones gramaticales, solicitados por experiencia
const { Events, AttachmentBuilder } = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const { welcomeDiscordMember } = require("../../modules/embeds");
const { ROLES } = require('../../configdiscord.json');
const { request } = require('undici');
const { consoleLog } = require("../../modules/necesarios");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        try {
            const ROLE = member.guild.roles.cache.find((r) => r.name === "Sin validar");
            ROLES.forEach(async (e) => {
                const ROLE = member.guild.roles.cache.get(e)
                await member.roles.add(e).then(() => {
                    consoleLog(`Se asigno el rol "${ROLE.name}" a ${member.user.tag}.`);
                }).catch((error) => {
                    consoleLog(`Error al asignar el rol:`, error);
                });
            })
            if (ROLE) {
                await member.roles.add(ROLE);
                consoleLog(`Rol "${ROLE.name}" asignado a ${member.user.tag}.`);

            } else {
                consoleLog("El rol no se encontró en el servidor.");
            }
            const CHANNEL_WELCOME = member.guild.channels.cache.find((channel) => channel.name === "bienvenidas");

            if (CHANNEL_WELCOME) {
                const CANVA = Canvas.createCanvas(1024, 500);
                const CANVAS_CONTEXT = CANVA.getContext('2d');

                const background = await Canvas.loadImage('src/img/server/banner-welcome.jpg');

                CANVAS_CONTEXT.drawImage(background, 0, 0, CANVA.width, CANVA.height);
                CANVAS_CONTEXT.fontKerning
                CANVAS_CONTEXT.font = '60px sans-serif';
                CANVAS_CONTEXT.fillStyle = '#ffffff';
                CANVAS_CONTEXT.strokeRect(0, 0, CANVA.width, CANVA.height);

                CANVAS_CONTEXT.beginPath();

                CANVAS_CONTEXT.arc(CANVA.width / 1.301, CANVA.height / 1.99, 130, 0, Math.PI * 2, true);
                CANVAS_CONTEXT.fillStyle = '#fff'

                CANVAS_CONTEXT.closePath();
                CANVAS_CONTEXT.clip();

                const { body } = await request(member.user.displayAvatarURL({ extension: 'jpg' }));
                const avatar = await Canvas.loadImage(await body.arrayBuffer());

                context.drawImage(avatar, CANVA.width / 1.5585, CANVA.height / 4.135, 260, 260);

                const attachment = new AttachmentBuilder(await CANVA.encode('png'), { name: 'profile-image.png' });
                CHANNEL_WELCOME.send({
                    content: `¡<@${member.user.id}>!`,
                    files: [attachment],
                    embeds: [welcomeDiscordMember({ interaction: member.user.id })]
                });
            }
        } catch (error) {
            consoleLog(`Error al asignar el rol:`, error);
        }
    }
}