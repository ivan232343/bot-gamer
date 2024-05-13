
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { Message, GuildMember, User, ThreadMember } = Partials
const { token } = require('./config.json');
const { selectLoader, eventsLoader, commandsLoader, buttonLoader, modalLoader } = require("./modules/Eventsloader");


// AREA BOT LOADER 
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [Message, User, GuildMember, ThreadMember]
});
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selects = new Collection();
// eventGuildLoader(client);
// eventServerLoader();

eventsLoader(client)
commandsLoader(client)

buttonLoader(client)
modalLoader(client)
selectLoader(client)
// mainloader(client)

client.login(token)


