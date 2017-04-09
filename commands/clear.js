const discord = require('discord.js');
const lang = require('../lang.js');

var clear = {};

clear.purge = function (message) {
    try {
        if (message.author.hasPermission("MANAGE_MESSAGES")) {
            message.channel.bulkDelete(100);
            message.reply("deleted 100 messages!");
        } else {
            message.reply(("brakuje ci uprawniewnia {0}, aby moc to robic!").replace("{0}", "MANAGE_MESSAGES"));
        }
    } catch (e) {
        message.reply("error!");
        console.log(e);
    }
}
module.exports = clear;