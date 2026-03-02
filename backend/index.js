import express from 'express';
import db from './config/db.js';

import usersRoutes from './routes/user.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import notesRoutes from './routes/notes.routes.js';
import linkRoutes from './routes/links.routes.js';
import authRoutes from './routes/auth.routes.js';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
// import swaggerUi from 'swagger-ui-express';
import generateSwaggerJSONFromRouter from './config/swagger.js';
import helmet from 'helmet';
import * as Sentry from "@sentry/node";
import { logger } from "./utils/logger.js";

import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// SECURITY + CORE MIDDLEWARE
app.set("trust proxy", 1);

app.use(
  morgan(
    ":remote-addr :method :url :status :response-time ms",
    {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }
  )
);

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://studyhub-dev.web.app",
    ],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());

// ROUTES
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.get("/", (_, res) => {
    res.send("StudyHub API is running");
});

app.use("/api/users", usersRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/auth", authRoutes);

//     CUSTOM ERROR HANDLER
app.use((err, req, res, next) => {
  logger.error("Unhandled Error", {
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    userId: req.user?.id || null,
  });

  res.status(500).json({ message: "Internal Server Error" });
});


app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
});