import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "../config/redis.js";

const createRedisRateLimiter = ({
    windowMs,
    limit,
    message = "Too many requests, please try again later.",
}) => {
    return rateLimit({
        windowMs,
        limit,
        standardHeaders: "draft-8",
        legacyHeaders: false,

        store: new RedisStore({
            sendCommand: (...args) => redisClient.sendCommand(args),
        }),

        handler: (req, res) => {
            res.status(429).json({
                success: false,
                message,
                data: null,
            });
        },

        // Keep the API available if Redis is temporarily unavailable.
        passOnStoreError: true,
    });
};

export default createRedisRateLimiter;
