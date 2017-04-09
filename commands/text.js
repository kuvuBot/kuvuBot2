const discord = require('discord.js');
const lang = require('../lang.js');

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

var text = {};

text.send = function (message) {
    try {
        let reply = '';
        let splitted = message.content.split(' ');
        if (splitted.length == 1) {
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.text <` + lang.pl_PL.commands.help.arguments.text + `>\``);
        } else {
            for (let i = 1; i < splitted.length; i++) {
                reply += toEmoji(splitted[i]).join(' ') + '   ';
            }
        }
        message.channel.sendMessage(reply);
    } catch (e) {
        message.reply("error!");
        console.log(e);
    }
}

module.exports = text;