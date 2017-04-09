const discord = require('discord.js');
const http = require('http');
const config = require('../config.js');
const lang = require('../lang.js');

function pushMojangStatus(message) {
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
            if (arg == 'mojang') {
                pushMojangStatus(message);
            } else {
                let options = {
                    host: 'api.kuvus.pl',
                    port: 80,
                    path: '/srv.php?s=' + encodeURIComponent(arg)
                };

                http.get(options).on('response', function (response) {
                    let reply = '';
                    response.on('data', function (chunk) {
                        reply += chunk;
                    });
                    response.on('end', function () {
                        let json = JSON.parse(reply);
                        if (json.online == true) {
                            var status = lang.pl_PL.commands.status.on;
                        } else {
                            var status = lang.pl_PL.commands.status.off;
                        }
                        if (json.online != false) {
                            const embed = new discord.RichEmbed()
                                .setTitle(config.settings.bot_name)
                                .setColor(config.settings.color.default)
                                .setFooter((lang.pl_PL.commands.status.footer).replace('{0}', config.settings.footer))
                                .setURL(config.settings.website)
                                .addField('' + lang.pl_PL.commands.status.status + ':', json.address)
                                .addField('➭ ' + lang.pl_PL.commands.status.status + ': ', status)
                                .addField('➭ ' + lang.pl_PL.commands.status.ping + ': ', parseInt(json.latency) + ' ms')
                                .addField('➭ ' + lang.pl_PL.commands.status.players + ': ', json.players.online + '/' + json.players.max)
                                .addField('➭ ' + lang.pl_PL.commands.status.version + ': ', json.version.name)
                                .addField('➭ ' + lang.pl_PL.commands.status.motd + ': ', json.description)
                            message.channel.sendEmbed(embed, {disableEveryone: true});
                        } else {

                        }
                    });
                });
            }
        } else {
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **` + lang.pl_PL.valid_usage + `**: \`.status <mojang/ip>\``);
        }
    } catch (e) {
        message.reply("error!");
        console.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}

module.exports = status;