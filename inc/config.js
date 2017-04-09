var config = {};

config.keys = require('./keys.js').keys;

config.settings = {
    'bot_name': 'kuvuBot',
    'bot_thumbnail': 'https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png',
    'bot_github': 'https://github.com/kuvuBot/kuvuBot2',
    'bot_invite_url': 'https://discordapp.com/oauth2/authorize?&client_id=205965155282976768&scope=bot&permissions=268561430',

    'color': {
        'default': '#2196f3',
        'pink': '#CC0066',
        'error': ''
    },

    'footer': '© 2016-2017 kuvuBot Team',
    'website': 'https://bot.kuvus.pl'
}

module.exports = config;
