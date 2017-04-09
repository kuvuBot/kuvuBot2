const discord = require('discord.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

var rawtext = {};

rawtext.send = function (message) {
    try {
        message.channel.startTyping();
        let reply = '```';
        let splitted = message.content.split(' ');
        if (splitted.length == 1) {
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.rawtext <` + lang.pl_PL.commands.help.arguments.text + `>\``);
        } else {
            for (let i = 1; i < splitted.length; i++) {
                splitted[i].split('').forEach(function (c) {
                    if (c.search(/a-z/)) {
                        reply += `:regional_indicator_${c}: `;
                    }
                });
                reply += '   ';
            }
            reply += '```';
            message.reply(reply);
        }
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}

module.exports = rawtext;