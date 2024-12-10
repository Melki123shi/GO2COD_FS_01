import express from 'express';
import error from '../middleware/error.js';
import users from '../routes/users.js';
import auth from '../routes/auth.js';
import posts from '../routes/posts.js';
import cors from 'cors';

export default function (app) {
    app.use(cors({
        origin: 'http://localhost:5173', // Allow requests from this origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
        credentials: true, // If using cookies or HTTP authentication
    }));

    app.use(express.json());
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/api/posts", posts);
    app.use(error);
   

}