const { Events, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const { welcomeDiscordMember } = require("../../modules/embeds");
const { initRoles } = require('../../json/roles.json');
const { request } = require('undici');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        try {
            // Obtén el rol que deseas asignar (en este caso, "Sin validar")
            const role = member.guild.roles.cache.find((r) => r.name === "Sin validar");
            initRoles.forEach(async (e) => {
                const role = member.guild.roles.cache.get(e)
                await member.roles.add(e).then(() => {
                    console.log(`Se asigno el rol "${role.name}" a ${member.user.tag}.`);
                }).catch((error) => {
                    console.error("Error al asignar el rol:", error);
                });
            })
            if (role) {
                // Asigna el rol al nuevo miembro
                await member.roles.add(role);
                console.log(`Rol "${role.name}" asignado a ${member.user.tag}.`);

            } else {
                console.log("El rol no se encontró en el servidor.");
            }
            // Obtén el canal "bienvenidas" (reemplaza con el ID de tu canal)
            const welcomeChannel = member.guild.channels.cache.find((channel) => channel.name === "bienvenidas");

            if (welcomeChannel) {
                // Envía el mensaje de bienvenida
                // The context will be used to modify the canvas
                const canvas = Canvas.createCanvas(1024, 500);
                const context = canvas.getContext('2d');

                const background = await Canvas.loadImage('src/img/server/banner-welcome.jpg');

                // This uses the canvas dimensions to stretch the image onto the entire canvas
                context.drawImage(background, 0, 0, canvas.width, canvas.height);
                context.fontKerning
                // Select the font size and type from one of the natively available fonts
                context.font = '60px sans-serif';

                // Select the style that will be used to fill the text in
                context.fillStyle = '#ffffff';

                // // Actually fill the text with a solid color
                // context.fillText(interaction.user.displayName, canvas.width / 2.5, canvas.height / 1.8);

                // Draw a rectangle with the dimensions of the entire canvas
                context.strokeRect(0, 0, canvas.width, canvas.height);


                // Add an exclamation point here and below
                // context.font = applyText(canvas, `${interaction.user.displayName}!`);

                // context.font = '75px sans-serif';
                // context.fillStyle = '#ffffff';
                // context.textAlign = "center"
                // context.fillText(`${member.user.displayName}!`, canvas.width / 1.35, canvas.height / 1.125);
                // // Slightly smaller text placed above the member's display name
                // context.font = '40px sans-serif';
                // context.fillStyle = '#ffffff';
                // context.fillText('Bienvenid@', canvas.width / 1.35, canvas.height / 1.350);

                // // Slightly smaller text placed above the member's display name
                // context.font = '23px sans-serif';
                // context.fillStyle = '#ffffff';
                // context.fillText('Disfruta tu instancia en el servidor', canvas.width / 2.5, canvas.height / 1.3);
                // Pick up the pen
                context.beginPath();

                // Start the arc to form a circle

                context.arc(canvas.width / 1.301, canvas.height / 1.99, 130, 0, Math.PI * 2, true);
                context.fillStyle = '#fff'

                // Put the pen down
                context.closePath();

                // Clip off the region you drew on
                context.clip();

                // Using undici to make HTTP requests for better performance
                const { body } = await request(member.user.displayAvatarURL({ extension: 'jpg' }));
                const avatar = await Canvas.loadImage(await body.arrayBuffer());

                // Move the image downwards vertically and constrain its height to 200, so that it's square

                context.drawImage(avatar, canvas.width / 1.5585, canvas.height / 4.135, 260, 260);


                // Use the helpful Attachment class structure to process the file for you
                const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
                // const embedWelcome = new EmbedBuilder()
                //     .setTitle("🎉 ¡Bienvenido/a winner! 🎉")
                //     .setDescription(`¡Hola <@${member.user.id}>! Esperamos que disfrutes tu estancia en nuestro servidor.\n\n-Pasate por <#${bienvenidas.rules}> para ver las reglas y guias del servidor.\n\n-¿Tienes problemas con el servicio? Genera un ticket de atencion en <#${bienvenidas.atencion}> y te atenderemos a la brevedad.`)
                //     .setImage(`attachment://profile-image.png`)
                //     .setColor('Orange')
                welcomeChannel.send({
                    content: `¡<@${member.user.id}>!`,
                    files: [attachment],
                    embeds: [welcomeDiscordMember({ interaction: member.user.id })]
                });
            }
        } catch (error) {
            console.error("Error al asignar el rol:", error);
        }
    }
}