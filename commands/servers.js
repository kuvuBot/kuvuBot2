const discord = require('discord.js');
const lang = require('../lang.js');

var servers = {};

servers.broadcast = function (message, client) {
    let msg = lang.pl_PL.commands.servers.description + ': \n' + '```' + client.guilds.map(r => '\n' + r.name.replace(/["`"]/g, "").replace(/^\s*/g, "") + ' (#' + r.id + ')' + ', ' + r.owner.displayName + '') + '```';
    message.reply(msg);
}
module.exports = servers;