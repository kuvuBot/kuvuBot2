const discord = require('discord.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

var servers = {};

servers.broadcast = function (message, client) {
    try {
        message.channel.startTyping();
        let msg = lang.pl_PL.commands.servers.description + ': \n' + '```' + client.guilds.map(r => '\n' + r.name.replace(/["`"]/g, "").replace(/^\s*/g, "") + ' (#' + r.id + ')' + ', ' + r.owner.displayName + '') + '```';
        message.reply(msg);
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}
module.exports = servers;