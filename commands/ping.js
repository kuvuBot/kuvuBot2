const discord = require('discord.js');
const lang = require('../lang.js');

var ping = {};

ping.reply = function (message) {
    message.reply(lang.pl_PL.commands.ping.reply)
}
module.exports = ping;