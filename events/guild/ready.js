const { Events, ActivityType, ActionRowBuilder } = require("discord.js");
// const onBD = require('../../modules/conectbd');
const { embedsB, adsWinBtns } = require('../../modules/builder');
const { areaATcliente, areaValidacion, areaVAsesor } = require('../../config.json');
// const { saludos } = require('../aleatorio/saludos.json')
// const randomIndex = Math.floor(Math.random() * saludos.length);
// const randomElement = saludos[randomIndex];
// console.log(randomElement)
const insertarVA = [embedsB().validateAsesor]
const componentesVA = [
  new ActionRowBuilder().addComponents(adsWinBtns().validateAsesor)
]
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {


    // client.channels.fetch(areaVAsesor).then(channel => channel.send({ embeds: insertarVA, components: componentesVA }))
    // // // let channel = client.channels.cache.get(channelId);

    // client.user.setPresence({
    //   status: "invisible"
    // })

    console.log('Guilds (servidores) en los que está el bot:');
    client.guilds.cache.forEach(async (guild) => await console.log(`- ${guild.name} (ID: ${guild.id})`));
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.user.setPresence({
      activities: [{ name: "jugando con los planes gamer", type: ActivityType.Custom }],
    })


  },
};
