export const users = [
    {
        sqlId: 1,
        discordId: '251697463235313664',
        email: 'admin@appl.de',
        name: 'Admin',
        password: 'admin',
        location: 'de',
        rang: 'admin'
    },
    {
        sqlId: 2,
        discordId: '12',
        email: 'user@appl.de',
        name: 'ApplUser',
        password: 'user',
        location: 'de',
        rang: 'user'
    }
];

export const endpoints = [
    {
        sqlId: 1,
        url: '/login',
        methode: 'GET',
        permission: 'everyone'
    },
    {
        sqlId: 2,
        url: '/check',
        methode: 'GET',
        permission: 'admin'
    },
    {
        sqlId: 3,
        url: '/logout',
        methode: 'GET',
        permission: 'everyone'
    },
    {
        sqlId: 4,
        url: '/sessions',
        methode: 'GET',
        permission: 'everyone'
    },
    {
        sqlId: 5,
        url: '/users',
        methode: 'GET',
        permission: 'admin'
    },
    {
        sqlId: 6,
        url: '/loginDiscord',
        methode: 'GET',
        permission: 'everyone'
    }
];

export const sessions = [];
