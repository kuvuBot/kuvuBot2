const discord = require('discord.js');
const config = require('../config.js');
const lang = require('../lang.js');

function pushAvatar(user, message) {
    const embed = new discord.RichEmbed()
        .setTitle(config.settings.bot_name)
        .setColor(config.settings.color.default)
        .setDescription((lang.pl_PL.commands.avatar.avatar).replace("{0}", user))
        .setFooter(config.settings.footer)
        .setURL(config.settings.website)
        .setImage(user.avatarURL)
    message.channel.sendEmbed(embed, {disableEveryone: true});
}

var avatar = {};

avatar.find = function (message, log) {
    let users = message.mentions.users;
    if (users.first()) {
        let result = '';
        users.forEach(function (user) {
            if (user.avatarURL == null) {
                if (user == message.author) {
                    message.reply(lang.pl_PL.commands.avatar.not_set);
                } else {
                    message.reply((lang.pl_PL.commands.avatar.not_found).replace("{0}", user));
                }
            } else {
                pushAvatar(user, message);
            }
        });
    } else {
        if (message.author.avatarURL == null) {
            message.reply(lang.pl_PL.commands.avatar.not_set);
        } else {
            pushAvatar(message.author, message);
        }
    }
}
module.exports = avatar;