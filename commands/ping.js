const discord = require('discord.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

let ping = {};

ping.reply = (message) => {
    try {
        message.reply(lang.pl_PL.commands.ping.reply)
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    }
}
module.exports = ping;