const discord = require('discord.js');
const figletModule = require('figlet');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

var figlet = {};

figlet.send = function (message) {
    try {
        message.channel.startTyping();
        let splitted = message.content.split(' ');
        if (splitted.length == 1) {
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.figlet <` + lang.pl_PL.commands.help.arguments.text + `>\``);
        } else {
            figletModule(message.content.replace(splitted[0] + ' ', ''), function(error, data) {
                if (error) { logger.log(error); return; }
                message.reply('');
                message.channel.sendMessage(`\`\`\`${data}\`\`\``);
            });
        }
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}

module.exports = figlet;