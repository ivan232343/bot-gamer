const { EmbedBuilder, ActionRowBuilder, isJSONEncodable } = require("discord.js");
const build = require("./builder");
const { ticketWincore } = require("../config.json");
const jsdom = require("jsdom");
async function __backGetTicket() {
  try {
    let dataContent = [];
    let response = await fetch(
      `https://appcrm.win.pe/pages/ajax/soporte_asesor_casos_lista.php?id_empresa=1&dni_usuario=12345678&id_subarea=8&buscador=&estado=1&cb_busca_columna=0&ventana=2&cb_cliente_elite=3`
    );
    // let response = await fetch(`http://172.27.201.14/pages/ajax/soporte_asesor_casos_lista.php?id_empresa=1&dni_usuario=12345678&id_subarea=51&buscador=&estado=1&cb_busca_columna=0&ventana=12&cb_cliente_elite=3`);
    let json = await response.json();
    json.forEach((element) => {
      if (element.motivo === "LOS ROJO" || element.motivo !== "DirectvGo") {
        let content = {
          nombreContacto: element.nombre_contacto,
          createFor: element.creado_por,
          ticket: element.ticket,
          createArea: element.area_creacion,
          motivo: element.motivo,
        };
        dataContent.push(content);
      }
    });
    return dataContent;
  } catch (error) {
    return { error: error };
  }
}
async function __ValidateGamer(formarCl) {
  const url = `https://appcrm.win.pe/pages/ajax/ws_atc_informacion_gamer.php?${formarCl}`
  const response = await fetch(url)
  return await response.text();
}
async function __callServer(method, link, data, ...args) {
  let toSend = JSON.stringify({
    method: method,
    params: data,
  });
  // console.log(toSend)
  let response = await fetch(link, {
    headers: {
      accept: "*/*",
      "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua":
        '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://wincore.win.pe/dataTables.php",
    referrerPolicy: "strict-origin-when-cross-origin",
    method: "POST",
    body: toSend,
  });
  let html = await response.text();
  return html;
}
async function __GetNameWC(codPedido) {
  const response = await fetch("https://wincore.win.pe/php/index2.php", {
    "headers": {
      "accept": "*/*",
      "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Microsoft Edge\";v=\"122\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "_tt_enable_cookie=1; _ttp=I2juWn5c4K4ybdzqLLNIgDZuRdU; gaVisitorUuid=701dd4a5-3faf-424c-af49-03f00c452f2c; _ga_B1P04M0LT3=GS1.2.1706670375.3.0.1706670375.60.0.0; _gid=GA1.2.20950538.1707764997; _fbp=fb.1.1707974107715.8266947100; _gcl_au=1.1.1143423791.1708849476; _ga_RNFT2LD0YW=GS1.1.1708912810.2.0.1708912810.60.0.0; _ga=GA1.2.1381626617.1705444597; _uetvid=9e1289f0adc011eebaa91b9e392297a6; _clck=pf2um7%7C2%7Cfjl%7C0%7C1468; win-azure-oauth2-cookie=d2luLWF6dXJlLW9hdXRoMi1jb29raWUtNjYwZWFjNzFlOWQxMzhlOTg4OGRmM2Q4NmYyNGU3ZDUuTnpTbUZjOVd5OF9NdUlhaVZOLWpxZw==|1709251548|6bV0lF6OoZVlUO7XyiVi9SkbfhoSPXBm6IUWy9qibWw=; _ga_J1DQF09WZC=GS1.2.1709251549.134.1.1709252068.0.0.0",
      "Referer": "https://wincore.win.pe/dataTables.php",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `{\"method\":\"logpostventa.getServicioClienteByCodigoPedidoOpticore\",\"params\":{\"cod_pedido\":\"${codPedido}\",\"ticked\":\"${ticketWincore}\"}}`,
    "method": "POST"
  });
  return await response.json()
}
module.exports = {
  tickets: async function (btnindex = 0) {
    let embedContent = [];
    try {
      await __backGetTicket().then((res) => {
        let splitterContent = [];
        if (res.length >= 1) {
          while (res.length > 0) {
            splitterContent.push(res.splice(0, 10));
          }
          console.log(splitterContent);
          for (let i = 0; i < splitterContent[btnindex].length; i++) {
            let embedchild = new EmbedBuilder()
              .setTitle(splitterContent[btnindex][i].nombreContacto)
              .setDescription(
                `Creado por ${splitterContent[btnindex][i].createFor} desde ${splitterContent[btnindex][i].createArea} \nN° ticket: ${splitterContent[btnindex][i].ticket}\nMotivo: ${splitterContent[btnindex][i].motivo} `
              )
              .setColor("Random");
            embedContent.push(embedchild);
          }
        } else {
          let embedchild = new EmbedBuilder().setDescription(
            `No se encontraron tickets disponibles`
          );
          embedContent.push(embedchild);
        }
      });
    } catch (error) {
      let embedchild = new EmbedBuilder().setDescription(
        `Ocurrio un error interno: ${error}`
      );
      embedContent.push(embedchild);
    }
    return embedContent;
  },
  btns: async function () {
    let btnbuilder = [];
    try {
      await __backGetTicket().then((res) => {
        let total = res.length;
        let splitter = Math.ceil(total / 10);

        console.log(total, splitter);
        if (splitter > 1) {
          for (let i = 0; i < splitter; i++) {
            btnbuilder.push({
              customId: `page-${i}`,
              label: `pag. ${i + 1}`,
              disabled: false,
            });
          }
        } else {
          btnbuilder.push({
            customId: `page-0`,
            label: `sin paginacion`,
            disabled: true,
          });
        }
      });
    } catch (error) {
      btnbuilder.push({
        customId: `page-0`,
        label: `no data`,
        disabled: true,
      });
    }
    console.log(btnbuilder);
    btnbuilder = build.boton(btnbuilder);

    let btnContent = new ActionRowBuilder().addComponents(btnbuilder);
    return btnContent;
  },
  ctoWincore: async function (consultaCto) {
    const ConsultaIdSitio = await __callServer(
      "logordenamientoplanta.getdatacto",
      "https://wincore.win.pe/php/index2.php",
      {
        tx_cto_nap: consultaCto,
        cod_sitio: consultaCto,
        ticked: ticketWincore,
      })
      .then(res => { return JSON.parse(res) })
      .then(res => typeof res.data !== 'undefined' ? res.data.length >= 1 ? { msg: "Se encontraron resultados", execute: true, find: true, datos: res.data[0] } : { msg: "No se encontraron datos", execute: true, find: false } : { msg: "Error al encontrar la CTO, posible error CTO mal escrita o no existe", execute: false })
      .catch(res => {
        return { msg: "Ocurrio un error interno", execute: false, code: res }
      });
    if (ConsultaIdSitio.execute) {
      if (ConsultaIdSitio.find) {
        const serviciosBox = [];
        const idSitio = ConsultaIdSitio.datos.tx_id_sitio;
        const portLogico = ConsultaIdSitio.datos.tx_nodo;
        const consultaDataSitio = await __callServer(
          "logordenamientoplanta.getpuertos",
          "https://wincore.win.pe/php/index2.php",
          {
            id_sitio: idSitio,
            ticked: ticketWincore,
          }
        )
          .then(res => { return JSON.parse(res) })
          .then(res => typeof res.data !== 'undefined' ? res.data.length >= 1 ? { msg: "Se encontraron resultados", execute: true, find: true, datos: res.data } : { msg: "No se encontraron datos", execute: true, find: false } : { msg: "Error al encontrar la CTO, posible error CTO mal escrita o no existe", execute: false })
          .catch(res => {
            return { msg: "Ocurrio un error interno", execute: false, code: res }
          });
        // console.log(consultaDataSitio)

        if (consultaDataSitio.execute) {
          if (consultaDataSitio.find) {
            for (let i = 0; i < consultaDataSitio.datos.length; i++) {
              const e = consultaDataSitio.datos[i];
              const serviceTemp = {
                sn: e.mac,
                cto: consultaCto,
                portLogic: portLogico,
                statusPort: e.estado_puerto,
                statusUnifilar: e.estado_unifilar,
                cliente: e.cliente,
                dni: e.nro_identidad
              };
              serviciosBox.push(serviceTemp);
            }
            return { data: serviciosBox, execute: true }
          } else { return consultaDataSitio }
        } else { return consultaDataSitio }


        // const DataResponse = consultaDataSitio.data;
        // if (DataResponse.length >= 1 && typeof DataResponse.status === "undefined") {

        // }
        // return serviciosBox;
      } else { return ConsultaIdSitio }
    } else { return ConsultaIdSitio }

  },
  getPotenciaOnt: async function (sn) {
    if (sn !== null) {
      const url = `https://appcrm.win.pe/pages/ajax/ws_atc_informacion_ont.php?mac=${sn}`;
      const response = await fetch(url);
      let html = await response.text();
      const dom = new jsdom.JSDOM(html);
      try {
        const OLT = `${dom.window.document.querySelectorAll(".row")[9].textContent.replace(/[A-Za-z\s]/g, "")} dBm`;
        const ONT = `${dom.window.document.querySelectorAll(".row")[8].textContent.replace(/[A-Za-z\s]/g, "")} dBm`;
        return { ont: ONT, olt: OLT }
      } catch (error) {
        // console.log(sn, dom.window.document.querySelectorAll(".row"), error)
        return { ont: '0 dbm', olt: '0 dbm' }
      }
    } else {
      return { ont: '0 dbm', olt: '0 dbm' }
    }
  },
  filterGamer: async function (codUser) {
    const formarCl = `codigo_cliente=${codUser}`
    const result = __ValidateGamer(formarCl).then(res => res.replace(/<br>/g).includes("Cliente no tiene plan Gamer"));
    return result;
  },
  getNameClxCodPed: async function (codP) {
    const response = __GetNameWC(codP);
    return response;
  },
  getPotencias: async function (sn) {
    const response = await __callServer(
      "logconodered.getInfoPotenciaByMacs",
      "https://wincore.win.pe/php/index2.php",
      {
        allnserie: [
          { nserie: sn }
        ],
        ticked: ticketWincore
      }
    )
      .then(res => JSON.parse(res).data)
      .catch(error => JSON.parse(`{"error":"true","msg":"no se pudo completar la consulta, no se encontraron datos","code":"${error}"}`))
    return response
  }

};
