import { redisClient } from "../config/redis.js";

export const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);

        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Redis GET error [${key}]:`, error.message);
        return null;
    }
};

export const setCache = async (key, data, ttl = 300) => {
    try {
        await redisClient.set(key, JSON.stringify(data), {
            EX: ttl,
        });
    } catch (error) {
        console.error(`Redis SET error [${key}]:`, error.message);
    }
};

export const deleteCache = async (key) => {
    try {
        await redisClient.del(key);
    } catch (error) {
        console.error(`Redis DELETE error [${key}]:`, error.message);
    }
};

export const incrementCacheVersion = async (key) => {
    try {
        await redisClient.incr(key);
    } catch (error) {
        console.error(`Redis INCR error [${key}]:`, error.message);
    }
};

export const deleteCacheByPattern = async (pattern) => {
    try {
        const keys = [];

        for await (const key of redisClient.scanIterator({
            MATCH: pattern,
            COUNT: 100,
        })) {
            keys.push(key);
        }

        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error(
            `Redis pattern delete error [${pattern}]:`,
            error.message
        );
    }
};