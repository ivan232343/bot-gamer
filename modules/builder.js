const {
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ActionRowBuilder
} = require("discord.js");
const { ctoWincore, getPotenciaOnt } = require('./fetch');
const { Parser } = require('json2csv');
const excelJS = require("exceljs");
const fs = require('fs');
const toUTC = require('../modules/utclocalconverter');
const { _BASE_URL_ } = require("../app/configs/base");


// const { ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
    cards: function (fijo, dep, sta, fa, tipo, pwd, doc, obs, operador, name = null) {
        return `${name !== null ? "Titular: " + name : ""}
        Documento:${doc}
        N° Fijo: ${fijo}
        Departamento: ${dep}
        Estado: ${sta}
        Fecha de alta: ${fa}
        Origen: ${tipo} de ${operador}
        Contraseña inicial de app FonoWin: ${pwd}
        Observacion: ${obs}`;
    },
    image: function (operador) {
        const thumdata = {
            "win": "win.png",
            "telefonica": "movistar.jpg",
            "claro": "claro.png",
            "entel": "entel.jpg",
            "uknow": "generico.png"
        }
        // const setThumbnail = (operador, texto) => {
        let retorna = "";

        const clavetext = {
            "telefonica": ['TELE', 'ele', 'Tel'],
            "claro": ['Amé', 'AME', 'ame'],
            "entel": ['Entel'],
        }
        if (operador === 'WIN') {
            retorna = thumdata.win
        } else {
            // const miString = "telefonica movil";
            retorna = thumdata.uknow
            Object.keys(clavetext).forEach((key) => {
                if (clavetext[key].some((word) => operador.includes(word))) { retorna = thumdata[key] }
            });
            console.log(retorna)
        }
        return retorna
    },
    boton: function (prop = []) {
        console.log(prop.length)
        if (prop.length > 4) {
            // aca lo haremos con select si en caso no supera los 4 botones
            let optionBuilder = [];
            prop.forEach(
                conponente => {
                    let optionTemp = new StringSelectMenuOptionBuilder()
                        .setLabel(`${conponente.label}`)
                        .setValue(conponente.customId)
                    optionBuilder.push(optionTemp)
                }
            )
            const componentsBuild = new StringSelectMenuBuilder()
                .setCustomId('index-menu')
                .setPlaceholder('Paginacion de listado de tickets')
                .addOptions(optionBuilder)
            return componentsBuild;
        } else {
            // si en caso hay menos de 4 entonces haremos los botones 
            const builder = []
            prop.forEach(propiedades => {
                let btnTempBuild = new ButtonBuilder()
                    .setCustomId(propiedades.customId)
                    .setLabel(`${propiedades.label}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(propiedades.disabled)
                    ;
                builder.push(btnTempBuild)
            })
            return builder;
        }
    },
    exportReporteCto: async function (cto, delimiter = ',') {
        delimiter = delimiter !== null ? delimiter : ',';
        cto = cto.includes(',') ? cto.split(delimiter) : cto
        let boxPromesas = []
        if (typeof cto === "object") {
            cto.forEach(e => boxPromesas.push(ctoWincore(e)));
        } else {
            boxPromesas.push(ctoWincore(cto))
        }
        return await Promise.all(boxPromesas).then(res => {
            // quitamos los index que no necesitamos o que esten haciendo relleno o que salgan errores
            const dataFormat = res.map(e => {
                const newArray = e.filter(item => item.dni !== '11111111' && typeof item.error === 'undefined');
                return newArray
            })
            return dataFormat
        }).then(res => {
            // unificamos todos los arrays que se hayan consultado
            let arregloUnido = [];
            res.forEach(e => arregloUnido = arregloUnido.concat(e));
            return arregloUnido;
        }).then(async datawincore => {
            // consultamos y unificamos las potencias de las sn
            let laterPromi = [];
            datawincore.forEach(e => laterPromi.push(getPotenciaOnt(e.sn)));
            return await Promise.all(laterPromi).then(res => {
                const arregloUnido = res.map((obj, index) => {
                    return Object.assign({}, obj, datawincore[index]);
                });
                return arregloUnido
            })
        }).then(res => {
            // generamos el formato del csv
            const tocsv = new Parser({ delimiter: '\t', includeEmptyRows: true });
            const csv = tocsv.parse(res)
            console.log(csv)
            return csv
        }).then(async res => {
            // creamos el archivo csv si en caso existe se elimina
            try {
                let okmotivo = 'Archivo csv generado con exito!'
                const path = `src/generate/reportes/reporte_cto_${typeof cto !== 'object' ? cto : 'multiple_cto'}.csv`
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                    okmotivo = 'el archivo existe';
                }
                fs.writeFileSync(path, res, { encoding: 'utf8' })
                return { status: 'ok', motivo: okmotivo }
            } catch (error) {
                console.error(error)
                return { status: 'error', motivo: error }
            }
        })

    },
    exportarRerpoteCto: async function (cto, delimiter = ',') {
        return await ctoWincore(cto).then(async res => {
            // quitamos los index que no necesitamos o que esten haciendo relleno o que salgan errores
            const dataFormat = await res.data.filter(item => item.dni !== '11111111' && typeof item.error === 'undefined');
            console.log(dataFormat)
            return dataFormat
        }).then(res => {
            // unificamos todos los arrays que se hayan consultado
            let arregloUnido = [];
            res.forEach(e => arregloUnido = arregloUnido.concat(e));
            return arregloUnido;
        }).then(async datawincore => {
            // consultamos y unificamos las potencias de las sn
            let laterPromi = [];
            datawincore.forEach(e => laterPromi.push(getPotenciaOnt(e.sn)));
            return await Promise.all(laterPromi).then(res => {
                const arregloUnido = res.map((obj, index) => {
                    return Object.assign({}, obj, datawincore[index]);
                });
                return arregloUnido
            })
        }).then(async res => {
            const dateNow = new Date();
            const workbook = new excelJS.Workbook();
            const worksheet = workbook.addWorksheet("CTO consultados");
            // worksheet.properties.defaultColWidth = 18; 
            const resmodify = res.map((dato) => Object.values(dato).map(d => d !== null ? d : ''))
            const reorderRes = resmodify.map((a) => [a[2], a[3], a[5], a[6], a[0], a[1], a[7], a[8]])
            // console.log(reorderRes)
            worksheet.insertRow(1, [resmodify[0][4], toUTC.toUTC(new Date().getDate()), `${new Date().getUTCHours()}:${new Date().getMinutes()}:${new Date().getUTCSeconds()}`]);
            worksheet.addTable({
                name: 'Reporte_CTO',
                ref: 'A2',
                headerRow: true,
                totalsRow: false,
                style: {
                    theme: 'TableStyleMedium5',
                    showRowStripes: true,
                },
                columns: [
                    { name: "Serial Number" },
                    { name: "CTO" },
                    { name: "Estado de puerto" },
                    { name: "Estado de servicio", filterButton: true },
                    { name: "Potencia ONT" },
                    { name: "Potencia OLT" },
                    { name: "Nombre del cliente" },
                    { name: "Documento" }
                ],
                rows: reorderRes
            });
            worksheet.getRow(1).eachCell(cell => cell.alignment = { horizontal: 'center', vertical: 'middle' });
            worksheet.properties.defaultColWidth = 20

            // worksheet.eachRow(row => row.alignment = {  })
            try {
                let okmotivo = 'Archivo generado con exito!'
                const path = `src/generate/reportes/reporte_cto_${typeof cto !== 'object' ? cto : 'multiple'}.xlsx`
                const data = await workbook.xlsx.writeFile(path)
                console.log(data)
                if (fs.existsSync(path)) {
                    okmotivo = 'el archivo existe';
                }
                return { status: 'ok', motivo: okmotivo, execute: true }
            } catch (error) {
                console.error(error)
                return { status: 'error', motivo: error, execute: false }
            }
        })
    },
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