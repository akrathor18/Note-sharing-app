import 'dotenv/config';
import express from 'express';
import db from './config/db.js';

import { connectRedis , redisClient} from "./config/redis.js";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
// import swaggerUi from 'swagger-ui-express';
import generateSwaggerJSONFromRouter from './config/swagger.js';
import helmet from 'helmet';
import * as Sentry from "@sentry/node";
import { logger } from "./utils/logger.js";

import morgan from "morgan";

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

// Core routes that do not initialize Redis-backed stores.
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.get("/", (_, res) => {
    res.send("StudyHub API is running");
});

app.get("/redis-test", async (req, res) => {
    await redisClient.set("studyhub:test", "Redis is working!");

    const value = await redisClient.get("studyhub:test");

    res.json({
        success: true,
        value,
    });
});

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


const startServer = async () => {
    try {
        await connectRedis();

        if (!redisClient.isOpen || !redisClient.isReady) {
            throw new Error("Redis connection completed without an open, ready client");
        }

        logger.info("Redis ready before route imports", {
            isOpen: redisClient.isOpen,
            isReady: redisClient.isReady,
        });

        const [users, quiz, notes, links, auth] = await Promise.all([
            import("./routes/user.routes.js"),
            import("./routes/quiz.routes.js"),
            import("./routes/notes.routes.js"),
            import("./routes/links.routes.js"),
            import("./routes/auth.routes.js"),
        ]);

        app.use("/api/users", users.default);
        app.use("/api/quiz", quiz.default);
        app.use("/api/notes", notes.default);
        app.use("/api/links", links.default);
        app.use("/api/auth", auth.default);

        logger.info("Route modules imported after Redis became ready");

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error("Failed to start server; Redis-backed routes were not initialized", {
            message: error.message,
            stack: error.stack,
        });

        process.exit(1);
    }
};

startServer();
