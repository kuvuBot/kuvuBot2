const discord = require('discord.js');
const http = require('http');
const config = require('../inc/config.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

function pushRandomCat(message) {
    let options = {
        host: 'random.cat',
        port: 80,
        path: '/meow'
    };

    http.get(options).on('response', function (response) {
        let reply = '';
        response.on('data', function (chunk) {
            reply += chunk;
        });
        response.on('end', function () {
            let json = JSON.parse(reply);
            
            const embed = new discord.RichEmbed()
                .setTitle(config.settings.bot_name)
                .setColor(config.settings.color.pink)
                .setDescription(lang.pl_PL.commands.cat.description)
                .setFooter(config.settings.footer)
                .setURL(config.settings.website)
                .setImage(json.file)
            message.channel.send(embed);
        });
    });
}

let cat = {};

cat.msg = function (message, log) {
    try {
        message.channel.startTyping();
        pushRandomCat(message);
    } catch (e) {
        message.reply("error!");
        logger.log(e);
    } finally {
        message.channel.stopTyping(true);
    }
}
module.exports = cat;
