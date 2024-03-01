import { createApp } from './app.js';
import { config } from 'dotenv';
import {cleanSessionStore} from './sessions/index.js';
import { s2ms } from './utils/functions.js';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

config();
const port = process.env.PORT || 3001;

async function main () {
    try {
        const app = createApp();
        app.listen(port, () => console.log(`Running on http://localhost:${port}`));
    } catch (err) {
        console.log(err);
    }
}

main();
setInterval(cleanSessionStore, s2ms(15));
