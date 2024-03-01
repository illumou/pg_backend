import { getCookieByName } from './functions.js';
import { endpoints, sessions, users } from './variables.js';

export const middleware = (req, res, next) => {
    console.log(req);

    const endpoint = endpoints.find(obj => obj.url === req._parsedUrl.pathname);
    if (!endpoint) {
        return res.sendStatus(404)
    }
    if (endpoint.permission === 'everyone') {
        return next();
    }
    const session = sessions.find(obj => obj.sessionId === getCookieByName(req, 'pgBackend'));
    if (!session) {
        res.sendStatus(401);
        return;
    }
    const user = users.find(obj => obj.sqlId === session.userId);
    if (user && user.rang === endpoint.permission) {
        return next();
    } else {
        res.sendStatus(401);
    }
};

export const checkCreds = (req, res, next) => {
    console.log(req.get('password'));
    return next();
};
