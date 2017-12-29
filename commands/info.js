const discord = require('discord.js');
const config = require('../inc/config.js');
const lang = require('../inc/lang.js');
const logger = require('../basic/logger.js');

let info = {};

info.msg = (message, log) => {
    try {
        var server;
        if (message.channel.type == "text") {
            server = message.guild.name;
        } else {
            server = "Private Message";
        }
        if (server == "Private Message") {
            message.reply(lang.pl_PL.commands.info.pm);
        }
        else {
            message.channel.startTyping();
            const embed = new discord.RichEmbed()
                .setTitle(config.settings.bot_name)
                .setColor(config.settings.color.default)
                .setFooter(config.settings.footer)
                .setThumbnail(config.settings.bot_thumbnail)
                .setURL(config.settings.website)
                .addField('' + lang.pl_PL.commands.info.name + ':', message.guild.name)
                .addField('' + lang.pl_PL.commands.info.id + ': ', message.guild.id)
                .addField('' + lang.pl_PL.commands.info.icon + ': ', message.guild.iconURL)
                .addField('' + lang.pl_PL.commands.info.created + ': ', message.guild.createdAt)
                .addField('' + lang.pl_PL.commands.info.owner + ': ', message.guild.owner)
                .addField('' + lang.pl_PL.commands.info.memberCount + ': ', message.guild.memberCount)
                .addField('' + lang.pl_PL.commands.info.defaultChannel + ': ', message.guild.defaultChannel)
                .addField('' + lang.pl_PL.commands.info.region + ': ', message.guild.region)
            message.channel.send(embed);
        }
    } catch (e) {
message.reply("error!");
logger.log(e);
    } finally {
message.channel.stopTyping(true);
    }
}
module.exports = info;
