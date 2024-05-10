const {
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");
const { _BASE_URL_ } = require("../app/configs/base");


// const { ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
    adsWinBtns: function (argT = "") {
        return {
            first: new ButtonBuilder()
                .setDisabled(true)
                .setLabel("Generar Ticket ->")
                .setStyle(ButtonStyle.Danger)
                .setCustomId("none"),
            upgrade: new ButtonBuilder()
                .setCustomId(`upgrade-gamer_${argT}`)
                .setEmoji('🎮')
                .setLabel('LevelUp to Gamer')
                .setStyle(ButtonStyle.Success),
            web: new ButtonBuilder()
                .setLabel('Ir a win.pe')
                .setEmoji('🌐')
                .setStyle(ButtonStyle.Link)
                .setURL("https://bit.ly/info-plan-gamer-win"),
            wsp: new ButtonBuilder()
                .setLabel("Whatsapp")
                .setEmoji('📞')
                .setStyle(ButtonStyle.Link)
                .setURL("https://bit.ly/whatsapp-win-gamer"),
            initTicket: new ButtonBuilder()
                .setCustomId('create-ticket')
                .setLabel('Con otro documento')
                .setStyle(ButtonStyle.Secondary),
            initTicketWithPrev: new ButtonBuilder()
                .setCustomId("create-ticket-with-validate")
                .setLabel("Generar ticket")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🤖'),
            validate: new ButtonBuilder()
                .setCustomId('validation')
                .setEmoji('🔰')
                .setLabel('Ingresar Documento')
                .setStyle(ButtonStyle.Primary),
            previusRegisterDoc: new ButtonBuilder()
                .setCustomId('previus-reg')
                .setLabel('Con mi documento')
                .setStyle(ButtonStyle.Success),
            validateAsesor: new ButtonBuilder()
                .setCustomId('validation-asesor')
                .setEmoji('👨‍💻')
                .setLabel('Registrarse')
                .setStyle(ButtonStyle.Success),
            sendfeed: new ButtonBuilder()
                .setCustomId('initfeedback')
                .setLabel("Enviar feedback")
                .setStyle(ButtonStyle.Primary)
        }
    },
    ticketbtns: function (id = "0") {
        return {
            lock: new ButtonBuilder()
                .setLabel('Pausar atencion')
                .setCustomId(`lock_${id}`) /**interaction.user.id */
                .setEmoji('🔒')
                .setStyle(ButtonStyle.Primary),
            unlock: new ButtonBuilder()
                .setLabel('Reanudar atencion')
                .setCustomId(`unlock_${id}`)/**interaction.user.id */
                .setEmoji('🔓')
                .setStyle(ButtonStyle.Primary),
            close: new ButtonBuilder()
                .setLabel('Cerrar atencion')
                .setCustomId(`close-ticket_${id}`)
                .setEmoji('❌')
                .setStyle(ButtonStyle.Danger),
            detallarProblema: new ButtonBuilder()
                .setLabel('Detallar problema')
                .setEmoji('🔎')
                .setStyle(ButtonStyle.Danger)
                .setCustomId(`problem_${id}`)/**dni */,
            upgrade: new ButtonBuilder()
                .setLabel('Upgrade')
                .setEmoji('⬆️')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`upgrade-ticket_${id}`)/**dni */,
            catchTicket: new ButtonBuilder()
                .setLabel('Atrapar ticket')
                .setEmoji('👈')
                .setStyle(ButtonStyle.Success)
                .setCustomId(`catch-ticket_${id}`)/**id del canal y dni del cliente */,
            closeurlticket: new ButtonBuilder()
                .setLabel("Visualizar chat")
                .setEmoji('🌐')
                .setStyle(ButtonStyle.Link)
                .setURL(`${_BASE_URL_}get/${id}`)
        }
    },
    SelectMotivo: function () {
        let categoriasBuild = [];
        Object.getOwnPropertyNames(categoria).forEach(e => {
            const tempCategoria = new StringSelectMenuOptionBuilder()
                .setDescription(categoria[e].Descripcion)
                .setLabel(categoria[e].Label)
                .setValue(categoria[e].value)
                .setEmoji(categoria[e].emoji)
            return tempCategoria
        })
        return categoriasBuild;
    },
    embedsB: function () {
        return {
            CreateTicket: new EmbedBuilder()
                .setTitle('Bienvenido al panel de tickets')
                .setDescription(`
        Hola Winner, para ayudarle con la consulta o el problema coloque su documento de identidad en el boton "Ingresar Documento"
        Si desea realizar la consulta a su servicio por favor haga click en "Con mi documento"      
      
        **Tenga en cuenta que este servicio es exclusivo para clientes con los nuevos planes gamer si desea contar con el servicio haga click en uno de las opciones de la segunda fila**`)
                .setThumbnail('https://win-internet.com.pe/img/card/plan-gamer.webp'),
            validateUser: new EmbedBuilder()
                .setTitle('Validacion cliente con los nuevos planes Gamer de WIN')
                .setDescription(`Hola Winner, para poder brindarle la experiencia completa del servidor requerimos que ingrese su documento de identidad para validar que cuente con el servicio gamer de win.
        Despues de validar podrá acceder a los siguientes canales:
- <#1215716247568912429> -> En este canal generaria ticket si tiene algun incoveniente con el servicio Gamer de win (Debe tener servicio GAMER obligatorio y el inconveniente debe ser en ese servicio).
- Todos los canales de "Zona gamer" para ingresar a una comunidad de jugadores y unirse a las partidas.

**Tenga en cuenta que este servidor tiene canales exclusivos para clientes gamer por lo cual se recomienda colocar el dni del titular del servicio para realizar la validacion correcta y pueda tener una experiencia completa.**`),
            validateAsesor: new EmbedBuilder()
                .setTitle("Registro de asesor gamer")
                .setDescription("Hola asesor, necesitamos que rellenes el formulario para llevar a cabo su registro, no tomara mucho tiempo")
                .setColor("Orange"),
            notGamer: new EmbedBuilder()
                .setTitle(`Ups, no tienes planes gamer de WIN`)
                .setDescription("Actualmente el Discord es un beneficio exclusivo para nuestra comunidad de Planes Gamer. Pero puede contratarlo llamando a Atencion al cliente win o ingresando a los links que le dejare a continuación:")
                .setImage("https://win.pe/img/share/wingamer.jpg")
                .setColor("Orange")
        }
    },
    removeUserRoles: async ({ interaction }) => {
        const roles = {
            noValidationRole: interaction.member.guild.roles.cache.find((r) => r.name === "Sin validar"),
            gamerWinRole: interaction.member.guild.roles.cache.find((r) => r.name === "Gamer Win"),
            regularRole: interaction.member.guild.roles.cache.find((r) => r.name === "Regular")
        }
        return new Promise((resolve) => {
            Object.getOwnPropertyNames(roles).forEach(async ele => {
                interaction.member.roles.remove(roles[ele])
                    .then(() => {
                        console.log(`Se ha quitado el rol "${roles[ele].name}" a ${interaction.member.user.tag}.`);
                    }).catch((error) => {
                        console.error("Error al quitar el rol:", error);
                    });
            })
            resolve(roles)
        })
    }
}