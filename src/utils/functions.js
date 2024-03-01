export function getCookieByName (request, name) {
    const { headers: { cookie } } = request;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        return values[name];
    }
}

export function generateSessionID (length) {
    const upLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const downLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specials = '-_';
    const allCharacters = upLetters + downLetters + numbers + specials;

    let idString = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * allCharacters.length);
        idString += allCharacters.charAt(index);
    }
    return idString;
}

export function s2ms (seconds) {
    return seconds * 1000;
}

export function m2ms (minutes) {
    return minutes * 60 * 1000;
}
