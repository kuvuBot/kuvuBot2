const discord = require('discord.js');
const figletModule = require('figlet');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

let figlet = {};

figlet.send = (message) => {
    try {
        message.channel.startTyping();
        let splitted = message.content.split(' ');
        if (splitted.length === 1) {
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.figlet <` + lang.pl_PL.commands.help.arguments.text + `>\``);
        } else {
            if (message.content.replace(splitted[0] + ' ', '').length < 33) {
                figletModule(message.content.replace(splitted[0] + ' ', ''), function(error, data) {
                    if (error) { logger.log(error); return; }
                    message.reply('');
                    message.channel.sendMessage('```' + data + '```');
                });
            } else {
                message.reply(lang.pl_PL.commands.figlet.too_long);
            }
        }
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}

module.exports = figlet;