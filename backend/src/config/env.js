import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT  || 3000,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
    },
    jwtSecret: process.env.JWT_SECRET,
};