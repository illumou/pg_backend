import {sessions, users} from "../../utils/variables.js";
import {json, Router} from 'express'
import {getCookieByName} from "../../utils/functions.js";
import {formToJSON} from "axios";

const router = Router();

router.get('/sessions', (request, response) => {
    response.send(sessions);
});

router.get('/users', (request, response) => {
    response.send(users);
});

router.get('/info', (request, response) => {

    const userSessionId = getCookieByName(request, 'pgBackend')
    const session = sessions.find(obj => obj.sessionId === userSessionId);

    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="de">
        <body>
            <h1> Deine Infos </h1>
            <p> Deine SessionID: ${ userSessionId }</p>
            <p> Deine Session im Store: ${ session.sessionId } </p>
        </body>
    </html>
    `
    response.setHeader('Content-Type', 'text/html');
    response.send(htmlResponse);
})

export default router;
