const discord = require('discord.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

function toEmoji(string) {
    let result = [];
    string.toLowerCase().split('').forEach(function (c) {
        let code = c.charCodeAt(0);
        let aCode = 97; //https://unicode-table.com/en/0061/
        let zCode = 122; //https://unicode-table.com/en/007A/
        if (code >= aCode && code <= zCode) {
            let regionalIndicatorACode = 127462; //https://unicode-table.com/en/1F1E6/
            let emojiCode = regionalIndicatorACode + code - aCode;
            result.push(String.fromCodePoint(emojiCode));
        }
    });
    return result;
}

let text = {};

text.send =  (message) => {
    try {
        message.channel.startTyping();
        let reply = '';
        let splitted = message.content.split(' ');
        if (splitted.length == 1) {
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.text <` + lang.pl_PL.commands.help.arguments.text + `>\``);
        } else {
            if (message.content.replace(splitted[0] + ' ', '').length <= 150) {
                for (let i = 1; i < splitted.length; i++) {
                    reply += toEmoji(splitted[i]).join(' ') + '   ';
                }
                message.channel.sendMessage(reply);
            } else {
                message.reply(lang.pl_PL.commands.text.too_long);
            }
        }
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}

module.exports = text;