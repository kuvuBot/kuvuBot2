let lang = {};

lang.pl_PL = {

    'aliases': {
        'help': '.pomoc',
        'ping': '.ping',
        'text': '.text',
        'rawtext': '.rawtext',
        'avatar': '.awatar',
        'isillegal': '.zdelegalizowac',
        'servers': '.serwery',
        'react': '.reaguj',
        'clever': '.clever',
        'cat': '.kot',
        'status': '.status'
    },

    'commands': {
        'isillegal': {
            'description': ' is now illegal!',
            'too_long': 'podaj krotszy tekst!',
            'error': 'wystapil blad!'
        },
        'cat': {
            'description': 'Losowy kotek!'
        },
        'ping': {
            'reply': 'pong!'
        },
        'servers': {
            'description': 'serwery, które używają kuvuBota'
        },
        'avatar': {
            'not_set': 'nie ustawiłeś jeszcze awatara!',
            'not_found': 'użytkownik {0} nie ma awatara!',
            'avatar': 'awatar {0}'
        },
        'status': {
            'on': '💚 Włączony',
            'off': '❤ Wyłączony',

            'server': 'Serwer',
            'status': 'Status',
            'ping': 'Ping',
            'players': 'Gracze',
            'version': 'Wersja',
            'motd': 'MOTD',

            'mojang_status': 'Status serwerów Mojang',
            'server_offline': 'ten serwer jest offline!',
        },
        'help': {
            'commands': 'Komendy',
            'urls': 'Linki',

            'arguments': {
                'text': 'tekst',
                'msg': 'wiadomość',
                'mention': 'wzmianka'
            },

            'help': 'wyświetla pomoc dotyczącą bota',
            'ping': 'wysyła "pong"',
            'text': 'generuje tekst w postaci emoji',
            'rawtext': 'generuje tekst w postaci kodu emoji',
            'avatar': 'wysyła avatar wskazanego użytkownika',
            'isillegal': 'delegalizuje podaną rzecz',
            'servers': 'wyświetla serwery na których jest {0}',
            'react': 'bot reaguje tekstem na wiadomość',
            'clever': 'porozmawiaj z botem!',
            'cat': 'wysyła zdjęcie kotka :3',
            'status': 'wyświetla status serwerów',

            'list_sent': 'lista komend została wysłana na PW!'
        }
    },

    'valid_usage': 'Poprawne użycie',

    'invite_bot': 'Dodaj kuvuBota na swój serwer!'
}

module.exports = lang;