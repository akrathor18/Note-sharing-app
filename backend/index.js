import express from 'express';
import db from './config/db.js';

import usersRoutes from './routes/users.js';
import quizRoutes from './routes/quizzes.js';
import notesRoutes from './routes/notes.js';
import linkRoutes from './routes/links.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
// import swaggerUi from 'swagger-ui-express';
import generateSwaggerJSONFromRouter from './config/swagger.js';
import helmet from 'helmet';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
// setupSwagger(app);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
});
// Middle wares

app.set("trust proxy", 1);

app.use(limiter);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(cookieParser());
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://studyhub-dev.web.app', // Firebase URL
        ],
        credentials: true,
    })
);
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.status(200).send('OK');
})

// Routes
app.get('/', (_, res) => {
    res.send('StudyHub API is running ');
});
// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(generateSwaggerJSONFromRouter(routes, fields)),
// );
app.use('/api/users', usersRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/links', linkRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

