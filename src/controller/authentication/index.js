import { Router } from 'express';
import {addSession, updateSession, deleteSession} from "../../sessions/index.js";
import { validateUser } from "../../utils/authentication/index.js";
import {getUserData} from "./utils/discord.js";

const router = Router();

let updatedResponse;
let updatedRequest;

router.get('/login', (request, response) => {
    updatedResponse = addSession(response);
    updatedResponse.sendStatus(200);
});

router.get('/getDiscordLink', (request, response) => {
    response.redirect('https://discord.com/api/oauth2/authorize?client_id=1085186828157595769&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauthentication%2FloginDiscord&scope=identify+email+connections')
})

router.get('/loginDiscord', async(request, response) => {
    const { code } = request.query
    if (code) {
        try {
            const userData = await getUserData(code)
            const userValidation = await validateUser('discord', userData)

            if (!userValidation) {
                response.status(403).redirect('http://localhost:3000/login?error=403')
                return;
            }

            updatedResponse = addSession(response);
            updatedResponse.status(200).redirect('http://localhost:3000');
        } catch(err) {
            response.status(403).redirect('http://localhost:3000/login?error=403')
        }
    } else {
        response.status(403).redirect('http://localhost:3000/login?error=403')
    }
});

router.get('/check', (request, response) => {
    try {
        const updatedResponse = updateSession(request, response);
        if (updatedResponse) {
            response.sendStatus(200)
        } else {
            response.sendStatus(400)
        }
    } catch (err) {
        console.error(err)
        response.sendStatus(400)
    }
});

router.get('/logout', (request, response) => {
    try {
        const updatedResponse = deleteSession(request, response);
        if (updatedResponse) {
            response.status(200).redirect('http://localhost:3000/login')
        } else {
            response.sendStatus(400).redirect('http://localhost:3000/login')
        }
    } catch (err) {
        console.error(err)
        response.sendStatus(400)
    }
});

export default router;
