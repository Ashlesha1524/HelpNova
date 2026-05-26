import { connect } from "mongoose";

const mongo_url = process.env.MONGODB_URL;

if (!mongo_url) {
    console.log("MONGODB_URL NOT FOUND");
} else {
    console.log("Mongo URL Loaded");
}

let cache = global.mongoose;

if (!cache) {
    cache = global.mongoose = {
        conn: null,
        promise: null
    };
}

const connectToDB = async () => {
    if (cache.conn) {
        console.log("Using Cached Connection");
        return cache.conn;
    }

    if (!cache.promise) {
        console.log("Connecting to MongoDB...");

        cache.promise = connect(mongo_url!, {
            family: 4,
            serverSelectionTimeoutMS: 5000,
        })
            .then((c) => {
                console.log("MongoDB Connected Successfully");
                return c.connection;
            })
            .catch((error) => {
                console.error("MongoDB Connection Error:", error);
                throw error;
            });
    }

    try {
        cache.conn = await cache.promise;
    } catch (error) {
        console.error("CACHE CONNECTION ERROR:", error);
        throw error;
    }

    return cache.conn;
};

export default connectToDB;