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
        'status': '.status',
        'figlet': '.figlet',
        'info': '.info'
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
            'reply': '🏓 Pong!'
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
            'on': '✅ Włączony',

            'server': 'Serwer',
            'status': 'Status',
            'ping': 'Ping',
            'players': 'Gracze',
            'version': 'Wersja',
            'motd': 'MOTD',

            'mojang_status': 'Status serwerów Mojang',
            'server_offline': 'ten serwer jest offline!'
        },
        'help': {
            'commands': 'Komendy użytkownika',
            'admincommands': 'Komendy administratora',
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
            'figlet': 'zwraca tekst w postaci kresek',
            'status': 'wyświetla status serwerów',
            'info': 'wyświetla informacje o serwerze',

            'list_sent': 'lista komend została wysłana na PW!'
        },
        'figlet': {
            'too_long': 'podaj krotszy tekst! (maks. 32 znaki)'
        },
        'rawtext': {
            'too_long': 'podaj krotszy tekst! (maks. 70 znakow)'
        },
        'text': {
            'too_long': 'podaj krotszy tekst! (maks. 150 znakow)'
        },
        'info': {
            'created': 'Stworzony',
            'defaultChannel': 'Domyślny kanał',
            'icon': 'Ikona',
            'id': 'ID',
            'memberCount': 'Liczba użytkowników',
            'name': 'Nazwa',
            'owner': 'Właściciel',
            'region': 'Lokalizacja',
            'pm': 'Ta komenda nie może być użyta w prywatnej wiadomości.'
        }
    },

    'valid_usage': 'Poprawne użycie',

    'invite_bot': 'Dodaj kuvuBota na swój serwer!'
}

module.exports = lang;
