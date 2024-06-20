/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * Modulo donde se encuentra todos los Embed del proyecto
 */
//Ivan Gabriel Pulache Chiroque - PROY-0041-2024EXP-WIN Discord - Sprint2 - 19/06/2024 se corrigeron las variables
const { EmbedBuilder } = require("discord.js");
const { CHANNELS } = require('../configdiscord.json');
module.exports = {
    assignWinGamer: (query = { interaction }) =>
        new EmbedBuilder()
            .setTitle("Plan Gamer")
            .setDescription(`## ¡<@${query.interaction}>, eres todo un Gamer!\n*En unos momentos, te asignaremos el rol **"Gamer Win"** para que puedas disfrutar al máximo del servidor.*`)
            .setThumbnail("attachment://logowingamer.png")
            .setTimestamp()
    ,
    assignRegular: (query = { interaction }) =>
        new EmbedBuilder()
            .setTitle("Plan Residencial")
            .setDescription(`<@${query.interaction}>, actualmente, no estás registrado como cliente gamer, pero, no te preocupes, puedes continuar navegando en nuestro servidor.\nEn caso consideres que esto pueda ser un error, puedes seleccionar nuevamente tu plan o contactarnos a través de nuestros canales de atención en __**[Whatsapp](https://wa.me/51940061937)**__, __**[Mi portal WIN](https://miportal.win.pe/)**__ y Call Center (01) 7073000.¡Estamos aquí para ayudarte!`)
            .setTimestamp()
            .setColor('Red')
    ,
    welcomeDiscordMember: (query = { interaction }) =>
        new EmbedBuilder()
            .setTitle("🎉 ¡Bienvenido/a winner! 🎉")
            .setDescription(`¡Hola <@${query.interaction}>!\nBienvenid@ a WIN. Esperamos que disfrutes tu tiempo en nuestro servidor exclusivo para Winners con Planes Gamer.\nPara interactuar, sigue estos pasos:\n- Revisa las reglas y guías del servidor en <#${CHANNELS.bienvenidas.rules}>\n- Regístrate en <#${CHANNELS.bienvenidas.activacion}>\n_**¿Tienes inconvenientes con el servicio? Una vez registrad@, genera un ticket de atención en <#${CHANNELS.bienvenidas.atencion}> y te ayudaremos lo más pronto posible**_`)
            .setImage(`attachment://profile-image.png`)
            .setColor('Orange')
    ,
    errorDuplicado: (query = { interaction, mode }) =>
        new EmbedBuilder()
            .setTitle(`Error, ${query.mode === 1 ? "Documento de Indentidad ya registrado" : "Ya se encuentra registrado"}`)
            .setDescription(`Lo sentimos <@${query.interaction}>, ${query.mode === 1 ? "el documento que acaba de colocar ya esta registrado por otro usuario 😌." : "Usted ya esta registrado en nuestro sistema"}`)
            .setColor('DarkPurple')
    ,
    staticsEmbeds: {
        CreateTicket: new EmbedBuilder()
            .setTitle('¡Bienvenid@ al Panel de Tickets!')
            .setDescription(`¿Necesitas soporte técnico? Si eres el titular del servicio, presiona el botón "Generar ticket"\n**Importante**: Este servicio es exclusivo para clientes de Planes Gamer. Si deseas adquirir el Plan Gamer, haz click en “Ir a win.pe” o “WhatsApp”.`)
            .setThumbnail('https://win-internet.com.pe/img/card/plan-gamer.webp'),
        validateUser: new EmbedBuilder()
            .setTitle('Validación de Planes Gamer WIN')
            .setDescription('¡Hola Winner! Para registrarte, debes ingresar tu documento de identidad en *Ingresar Documento*'),
        validateAsesor: new EmbedBuilder()
            .setTitle("Registro de asesor gamer")
            .setDescription("Hola asesor, necesitamos que rellenes el formulario para llevar a cabo su registro, no tomara mucho tiempo")
            .setColor("Orange"),
        notGamer: new EmbedBuilder()
            .setTitle(`Ups, no tienes planes gamer de WIN`)
            .setDescription("Actualmente el Discord es un beneficio exclusivo para nuestra comunidad de Planes Gamer. Pero puede contratarlo llamando a Atencion al cliente win o ingresando a los links que le dejare a continuación:")
            .setImage("https://win.pe/img/share/wingamer.jpg")
            .setColor("Orange"),
        feedback: new EmbedBuilder()
            .setTitle("Panel de envio de feedback")
            .setDescription(`Tu opinión es importante para nosotros, por lo cual nos gustaria saber su opinion acerca del servidor y/o comentarios de mejora. Haga click en "enviar feedback"`)
            .setColor('Orange')
    }
}