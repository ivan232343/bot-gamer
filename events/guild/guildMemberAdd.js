/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Evento que gestiona quien entra al servidor, envia un mensaje tipo "embed" al canal de #bienvenidas
 * con una imagen generada
 */
const { Events, AttachmentBuilder } = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const { welcomeDiscordMember } = require("../../modules/embeds");
const { initRoles } = require('../../json/roles.json');
const { request } = require('undici');
const { consoleLog } = require("../../modules/necesarios");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        try {
            const role = member.guild.roles.cache.find((r) => r.name === "Sin validar");
            initRoles.forEach(async (e) => {
                const role = member.guild.roles.cache.get(e)
                await member.roles.add(e).then(() => {
                    consoleLog(`Se asigno el rol "${role.name}" a ${member.user.tag}.`);
                }).catch((error) => {
                    consoleLog(`Error al asignar el rol:`, error);
                });
            })
            if (role) {
                await member.roles.add(role);
                consoleLog(`Rol "${role.name}" asignado a ${member.user.tag}.`);

            } else {
                consoleLog("El rol no se encontró en el servidor.");
            }
            const welcomeChannel = member.guild.channels.cache.find((channel) => channel.name === "bienvenidas");

            if (welcomeChannel) {
                const canvas = Canvas.createCanvas(1024, 500);
                const context = canvas.getContext('2d');

                const background = await Canvas.loadImage('src/img/server/banner-welcome.jpg');

                context.drawImage(background, 0, 0, canvas.width, canvas.height);
                context.fontKerning
                context.font = '60px sans-serif';
                context.fillStyle = '#ffffff';
                context.strokeRect(0, 0, canvas.width, canvas.height);

                context.beginPath();

                context.arc(canvas.width / 1.301, canvas.height / 1.99, 130, 0, Math.PI * 2, true);
                context.fillStyle = '#fff'

                context.closePath();
                context.clip();

                const { body } = await request(member.user.displayAvatarURL({ extension: 'jpg' }));
                const avatar = await Canvas.loadImage(await body.arrayBuffer());

                context.drawImage(avatar, canvas.width / 1.5585, canvas.height / 4.135, 260, 260);

                const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
                welcomeChannel.send({
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