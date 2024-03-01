import { sessions } from '../utils/variables.js';
import {generateSessionID, getCookieByName, m2ms} from "../utils/functions.js";

let expireTimestamp;
let expireDate;
let sessionId;
let userSessionId;

export function addSession (response) {

    expireTimestamp = Date.now() + m2ms(2);
    expireDate = new Date(expireTimestamp);
    sessionId = generateSessionID(30);

    const data = {
        sqlId: 1,
        userId: 1,
        sessionId,
        expireTimestamp,
        expireDate
    };

    sessions.push(data);

    response.cookie('pgBackend', sessionId, {
        expires: expireDate
    });

    return response
}

export function updateSession (request, response) {

    userSessionId = getCookieByName(request, 'pgBackend');
    if (!userSessionId) {
        return false
    }

    expireTimestamp = Date.now() + m2ms(2);
    expireDate = new Date(expireTimestamp);

    let session = sessions.find(obj => obj.sessionId === userSessionId);
    if (!session) {
        return false
    }

    session.expireTimestamp = expireTimestamp;
    session.expireDate = expireDate;

    response.cookie('pgBackend', userSessionId, {
        expires: expireDate
    })
    return response;
}

export function deleteSession (request, response) {
    userSessionId = getCookieByName(request, 'pgBackend');
    if (!userSessionId) {
        throw 'No Session'
    }
    const deleteSession = sessions.find(obj => obj.sessionId === userSessionId);
    const index = sessions.findIndex(obj => obj.sessionId === deleteSession.sessionId);
    sessions.splice(index, 1);
    response.clearCookie('pgBackend');
    return response;
}

export function cleanSessionStore () {
    console.log('DELETE INTERVAL');
    const timestamp = Date.now();
    const deleteSessions = sessions.filter(obj => obj.expireTimestamp < timestamp);
    console.log(deleteSessions);
    if (deleteSessions) {
        deleteSessions.forEach(deleteSession => {
            console.log('TO BE DELETED SESSION:', deleteSession.sessionId);
            const index = sessions.findIndex(obj => obj.sessionId === deleteSession.sessionId);
            sessions.splice(index, 1);
        });
    }
}
