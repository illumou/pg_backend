import express from 'express';
import cors from 'cors';

import controller from './controller/index.js';

export function createApp () {
    const app = express();

    const corsOptions = {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 200
    };

    app.use(express.json());

    app.use('/api', controller);
    app.use(express.json())
    app.use(cors(corsOptions));

    return app;
}
