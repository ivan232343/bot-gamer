const { EmbedBuilder } = require("discord.js");
const { bienvenidas } = require('../json/canales.json');
module.exports = {
    assignWinGamer: (query = { interaction }) =>
        new EmbedBuilder()
            .setTitle("Cliente Gamer 🎮")
            .setDescription(`Genial <@${query.interaction}>, Se pudo validar correctamente que usted es cliente gamer,\nEn instantes se le asignara el rol "Gamer Win" y asi disfrutar del servidor.`)
            .setThumbnail("https://win.pe/img/preguntas-frecuentes/gamer.png")
            .setTimestamp()
    ,
    assignRegular: (query = { interaction }) =>
        new EmbedBuilder()
            .setTitle("Cliente regular")
            .setDescription(`Ups <@${query.interaction}>, Se valida que no es cliente gamer, pero aún así podrá disfrutar del servidor de manera limitada. \nSi crees que se trata de un error, no dude en contactarse con atención al cliente para resolver el inconveniente o contratar el servicio. \nLes dejamos nuestros canales de atención por whatsapp, página web o nuestro número de atención (01) 7073000.`)
            .setTimestamp()
            .setColor('Red')
    ,
    welcomeDiscordMember: (query = { interaction }) =>
        new EmbedBuilder()
            .setTitle("🎉 ¡Bienvenido/a winner! 🎉")
            .setDescription(`¡Hola <@${query.interaction}>! Esperamos que disfrutes tu estancia en nuestro servidor.\n\n-Pasate por <#${bienvenidas.rules}> para ver las reglas y guias del servidor.\n
            -Para atenderte y usar el servidor, necesitamos que te registres en <#${bienvenidas.activacion}>\n
            -¿Tienes problemas con el servicio? Genera un ticket de atencion en <#${bienvenidas.atencion}> y te atenderemos a la brevedad __previamente registrado.__`)
            .setImage(`attachment://profile-image.png`)
            .setColor('Orange')
    ,
    errorDuplicado: (query = { interaction, mode }) =>
        new EmbedBuilder()
            .setTitle(`Error, ${query.mode === 1 ? "Documento de Indentidad ya registrado" : "Ya se encuentra registrado"}`)
            .setDescription(`Lo sentimos <@${query.interaction}>, ${query.mode === 1 ? "el documento que acaba de colocar ya esta registrado por otro usuario 😌" : "Usted ya esta registrado en nuestro sistema"}`)
            .setColor('DarkPurple')
    ,
    staticsEmbeds: {
        CreateTicket: new EmbedBuilder()
            .setTitle('Bienvenido al panel de tickets')
            .setDescription(`
Si desea realizar una consulta o tienes algún problema con tu servicio y eres el titular deberás presionar el botón \`\`Con mi documento\`\`, si no eres el titular deberás presionar \`\`Con otro documento\`\`.
**_Este servicio es exclusivo para clientes de Planes Gamer, si desea adquirir el servicio, haga click en alguna opción de la segunda fila._**
            `)
            .setThumbnail('https://win-internet.com.pe/img/card/plan-gamer.webp'),
        validateUser: new EmbedBuilder()
            .setTitle('Validacion cliente con los nuevos planes Gamer de WIN')
            .setDescription('¡Hola Winner! Para registrarte debes ingresar tu documento de identidad en \`\`Ingresar Documento\`\`')
        ,
        //             .setDescription(`Hola Winner, para poder brindarle la experiencia completa del servidor requerimos que ingrese su documento de identidad para validar que cuente con el servicio gamer de win.
        // Luego de hacer la validación, podrás acceder a los siguientes canales:
        // - <#1215716247568912429> -> En este canal generaria ticket si tiene algun incoveniente con el servicio Gamer de win **(Debe tener servicio __GAMER__ obligatorio y el inconveniente debe ser en ese servicio)**.
        // - Todos los canales de "Zona gamer" para ingresar a una comunidad de jugadores y unirse a las partidas.

        // **Tenga en cuenta que este servidor tiene canales exclusivos para clientes gamer por lo cual se recomienda colocar el dni del titular del servicio para realizar la validacion correcta y pueda tener una experiencia completa.**`),
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
            .setTitle("Panel de feedback")
            .setDescription("Este servidor es nuevo por ende puede que estemos cometiendo errores, por lo cual nos gustaria mejorar para brindarle una experiencia mas especializada, \n## ***por eso tu opinion es importante***")
            .setColor('Orange')
    }
}