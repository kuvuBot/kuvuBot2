const discord = require('discord.js');
const https = require('https');
const config = require('../inc/config.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

function pushMojangStatus(message, callback) {
    try {
        let options = {
            host: 'bot.kuvus.pl',
            port: 443,
            path: '/api/mojang.php'
        };

        https.get(options).on('response', function (response) {
            let reply = '';
            response.on('data', function (chunk) {
                reply += chunk;
            });
            response.on('end', function () {
                const embed = new discord.RichEmbed()
                    .setTitle(config.settings.bot_name)
                    .setColor(config.settings.color.default)
                    .setFooter(config.settings.footer)
                    .setThumbnail(config.settings.bot_thumbnail)
                    .setURL(config.settings.website)
                    .addField(lang.pl_PL.commands.status.mojang_status + ': \n', reply)
                message.channel.send(embed);
                callback();
            });
        });
    }
    catch (e) {
        message.reply("error!");
        logger.log(e);
    }
}

function pushServerStatus(message, ip, callback) {
    let options = {
        host: 'api.skript.pl',
        port: 443,
        path: '/server/' + encodeURIComponent(ip) + '/'
    };

    https.get(options).on('response', function (response) {
        let reply = '';
        response.on('data', function (chunk) {
            reply += chunk;
        });
        response.on('end', function () {
            let json = JSON.parse(reply);
            if (json.online) {
                const embed = new discord.RichEmbed()
                    .setTitle(config.settings.bot_name)
                    .setColor(config.settings.color.default)
                    .setFooter(config.settings.footer)
                    .setThumbnail(config.settings.bot_thumbnail)
                    .setURL(config.settings.website)
                    .addField('' + lang.pl_PL.commands.status.status + ':', json.address)
                    .addField('➭ ' + lang.pl_PL.commands.status.status + ': ', lang.pl_PL.commands.status.on)
                    .addField('➭ ' + lang.pl_PL.commands.status.ping + ': ', parseInt(json.latency) + ' ms')
                    .addField('➭ ' + lang.pl_PL.commands.status.players + ': ', json.players.online + '/' + json.players.max)
                    .addField('➭ ' + lang.pl_PL.commands.status.version + ': ', json.version.name)
                    .addField('➭ ' + lang.pl_PL.commands.status.motd + ': ', json.description)
                message.channel.send(embed);
            } else {
                message.reply(lang.pl_PL.commands.status.server_offline);
            }
            callback();
        });
    });
}

var status = {};

status.get = function (message) {
    try {
        message.channel.startTyping();
        let args = message.content.split(" ").slice(1);
        if (args[0] != undefined) {
            let arg = args[0].toLowerCase();
            switch (arg) {
                case 'mojang':
                    pushMojangStatus(message, function () {
                        return message.channel.stopTyping(true);
                    });
                    break;
                default:
                    pushServerStatus(message, arg, function () {
                        return message.channel.stopTyping(true);
                    });
            }
        } else {
            message.channel.send(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.status <mojang/ip>\``);
        }
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}

module.exports = status;
