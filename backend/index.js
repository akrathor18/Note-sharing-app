import express from 'express';
import db from './config/db.js';

import users from './routes/users.js';
import quiz from './routes/quizzes.js';
import notes from './routes/notes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
// import swaggerUi from 'swagger-ui-express';
import generateSwaggerJSONFromRouter from './config/swagger.js';
import helmet from 'helmet';

dotenv.config();

const port = process.env.BACKEND_PORT || 3000;
const app = express();
// setupSwagger(app);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
});
// Middle wares

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_PORT || 'http://localhost:5173',
        credentials: true,
    }),
);
app.use(bodyParser.json());

// Routes
app.get('/', (_, res) => {
    res.send('Hello World!');
});
// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(generateSwaggerJSONFromRouter(routes, fields)),
// );
app.use('/api/users', users);
app.use('/api/quiz', quiz);
app.use('/api/notes', notes);

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📘 Swagger docs at http://localhost:${port}/api-docs`);
});
