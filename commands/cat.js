const discord = require('discord.js');
const https = require('https');
const config = require('../config.js');
const lang = require('../lang.js');

function pushRandomCat(type, message) {
    let options = {
        host: 'api.kiciusie.pl',
        port: 443,
        path: '/index.php?type=get&mode=' + type
    };

    https.get(options).on('response', function (response) {
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
                .setImage(json.url)
            message.channel.sendEmbed(embed, {disableEveryone: true});
        });
    });
}

var cat = {};

cat.msg = function (message, log) {
    try {
        let args = message.content.split(" ").slice(1);
        let category1 = args[0];
        var category;
        if (category1 != undefined) {
            category = category1.toLowerCase();
        }

        switch (category) {
            case 'gif':
                pushRandomCat('gif', message);
                break;
            default:
                pushRandomCat('image', message);
        }
    } catch (e) {
        message.reply("error!");
        console.log(e);
    }
}
module.exports = cat;