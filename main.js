let lmsg = "[" + (new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')) + "] Starting kuvuBot2.."; console.log(lmsg);
let loadstart = new Date();
var running = false;

const logger = require('./basic/logger.js');
const discord = require('discord.js');
const fs = require("fs");
const client = new discord.Client();
const http = require('http');
const cleverbot = require('cleverbot');

const config = require('./inc/config.js');
const lang = require('./inc/lang.js');

const avatar = require('./commands/avatar.js');
const cat = require('./commands/cat.js');
const isilegall = require('./commands/isillegal.js');
const ping = require('./commands/ping.js');
const help = require('./commands/help.js');
const text = require('./commands/text.js');
const rawtext = require('./commands/rawtext.js');
const servers = require('./commands/servers.js');
const react = require('./commands/react.js');
const status = require('./commands/status.js');
const clear = require('./commands/clear.js');
const figlet = require('./commands/figlet.js');
const info = require('./commands/info.js');


fs.appendFile("bot.log", lmsg + "\n", function (error) {if (error) throw error;});

client.on('ready', () => {

    client.user.setGame('.pomoc');
    client.user.setAvatar('./resources/avatar.png');

    if (running == false) {
        logger.log("Bot running! (Took: " + ((new Date()).getTime() - loadstart.getTime()) + " ms)");
        running = true;
    }
});

client.on('message', message => {
    if (message.author.bot) return;

    var server;
    if (message.channel.type == "text") {
        server = message.guild.name;
    } else {
        server = "Private Message";
    }

    if (message.content.startsWith('<@!' + client.user.id + '>') || message.content.startsWith('<@' + client.user.id + '>')) {
        let msg = message.content.replace('<@!' + client.user.id + '>', '@bot').replace('<@' + client.user.id + '>', '@bot');
        logger.log(`[${server}] ${message.author.username} text: ${msg}`);
    } else {
        if (server == "Private Message") {
            if (message.content.startsWith(".")) {
                logger.log(`[${server}] ${message.author.username} issued bot command: ${message.content}`);
            } else {
                logger.log(`[${server}] ${message.author.username} text: ${message.content}`);
            }
        } else {
            if (message.content.startsWith(".")) {
                logger.log(`[${server}] ${message.author.username} issued bot command: ${message.content}`);
            }
        }
    }

    if (message.content.startsWith('<@!' + client.user.id + '>') || message.content.startsWith('<@' + client.user.id + '>') || !message.content.startsWith(".") && server == "Private Message") {
        try {
            message.channel.startTyping();
            let question = message.content.replace('<@!' + client.user.id + '> ', '').replace('<@' + client.user.id + '>', '@bot');
            let bot = new cleverbot({key: config.keys.cleverbot});

            bot.query(question).then(function (response) {
                message.reply(response.output);
            }).catch(function (error) {
                emsg = "sorry but I can't resolve your message. My systems not working correctly..";
                if (error == "Error: Cleverbot API key not valid") {
                    emsg += " (Invalid API key)";
                }
                message.reply(emsg);
            });
            message.channel.stopTyping(true);
        } catch (e) {
            message.reply("sorry but I can't resolve your message. My systems not working correctly..");
            logger.log(e);
        }

    } else {
        let args = message.content.toLowerCase().split(' ');
        switch (args[0]) {
            case '#reklama':
                message.delete();
                message.channel.sendMessage('Zapraszam do zapoznania się z innymi projektami mojego stwórcy!\nStrona www: https://kuvus.pl');
                break;

            case '.ping':
            case lang.pl_PL.aliases.ping:
                ping.reply(message);
                break;

            case '.help':
            case lang.pl_PL.aliases.help:
                help.send(message);
                break;

            case '.servers':
            case lang.pl_PL.aliases.servers:
                servers.broadcast(message, client);
                break;

            case '.isillegal':
            case lang.pl_PL.aliases.isillegal:
                isilegall.msg(message);
                break;

            case '.avatar':
            case lang.pl_PL.aliases.avatar:
                avatar.find(message);
                break;

            case '.text':
            case lang.pl_PL.aliases.text:
                text.send(message);
                break;

            case '.rawtext':
            case lang.pl_PL.aliases.rawtext:
                rawtext.send(message);
                break;

            case '.react':
            case lang.pl_PL.aliases.react:
                react.react(message);
                break;

            case '.status':
            case lang.pl_PL.aliases.status:
                status.get(message);
                break;

            case '.cat':
            case lang.pl_PL.aliases.cat:
                cat.msg(message);
                break;

            case '.clear':
                clear.purge(message);
                break;

            case '.figlet':
            case lang.pl_PL.aliases.figlet:
                figlet.send(message);
                break;
            case '.info':
                info.msg(message);
                break;
        }
    }
});

client.login(config.keys.discord);
