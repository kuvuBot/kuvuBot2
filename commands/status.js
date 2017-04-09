const discord = require('discord.js');
const https = require('https');
const http = require('http');
const config = require('../inc/config.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

function pushMojangStatus(message, callback) {
    let options = {
        host: 'api.kuvus.pl',
        port: 80,
        path: '/?t=status&s=mojang'
    };
    http.get(options).on('response', function (response) {
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
            message.channel.sendEmbed(embed, {disableEveryone: true});
            callback();
        });
    });
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
                message.channel.sendEmbed(embed, {disableEveryone: true});
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
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.status <mojang/ip>\``);
        }
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}

module.exports = status;