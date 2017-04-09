const discord = require('discord.js');
const https = require('https');
const querystring = require('querystring');
const config = require('../inc/config.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

function getIllegalImage(text, callback) {
    let options = {
        host: 'is-now-illegal.firebaseio.com',
        port: '443',
        path: '/gifs/' + encodeURIComponent(text) + '.json',
        method: 'GET'
    }

    let request = https.request(options, function (response) {
        response.setEncoding('utf8');
        let reply = '';
        response.on('data', function (chunk) {
            reply += chunk;
        });
        response.on('end', function () {
            if (reply != "null") {
                callback(JSON.parse(reply).url);
            } else {
                callback("error");
            }
        });
    })

    request.end();
}

function createIllegalImage(text, callback) {
    let data = JSON.stringify({
        'task': 'gif',
        'word': text.toUpperCase()
    });
    let options = {
        host: 'is-now-illegal.firebaseio.com',
        port: '443',
        path: '/queue/tasks.json',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        }
    };

    let request = https.request(options, function (response) {
        response.setEncoding('utf8');
        let reply = '';
        response.on('data', function (chunk) {
            reply += chunk;
        });
        response.on('end', function () {
            getIllegalImage(text.toUpperCase(), function (result) {
                callback(result);
            });
        });
    });

    request.write(data);
    request.end();
}

var isillegal = {};

isillegal.msg = function (message) {
    try {
        message.channel.startTyping();
        let args = message.content.split(" ");
        let text = message.content.replace(args[0] + " ", "");
        if (args[1] != undefined && text.length > 0) {
            if (text.length > 10) {
                message.reply(lang.pl_PL.commands.isillegal.too_long);
            } else {
                createIllegalImage(text, function (result) {
                    if (result == "error") {
                        message.reply(lang.pl_PL.isillegal.error)
                    } else {
                        const embed = new discord.RichEmbed()
                            .setTitle(config.settings.bot_name)
                            .setColor(config.settings.color.default)
                            .setDescription(text + lang.pl_PL.commands.isillegal.description)
                            .setFooter(config.settings.footer)
                            .setURL(config.settings.website)
                            .setImage(result)
                        message.channel.sendEmbed(embed, {disableEveryone: true});
                    }
                });
            }
        } else {
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.isillegal <text>\``);
        }
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}
module.exports = isillegal;