const discord = require('discord.js');
const lang = require('../lang.js');

var ping = {};

ping.reply = function (message) {
    try {
        message.reply(lang.pl_PL.commands.ping.reply)
    } catch (e) {
        message.reply("error!");
        console.log(e);
    }
}
module.exports = ping;