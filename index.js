/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * archivo raiz donde se inician los componentes para la utilizacion del bot, como los mensajes de bienvenida, los comandos, botones, modals, selects, etc
 */
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { Message, GuildMember, User, ThreadMember } = Partials
const { TOKEN } = require('./config.json');
const { selectLoader, eventsLoader, commandsLoader, buttonLoader, modalLoader } = require("./modules/Eventsloader");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [Message, User, GuildMember, ThreadMember]
});
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selects = new Collection();
eventsLoader(client);
commandsLoader(client);
buttonLoader(client);
modalLoader(client);
selectLoader(client);

client.login(TOKEN);


