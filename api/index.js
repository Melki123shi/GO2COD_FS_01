import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./startup/db.js";
import routes from "./startup/routes.js";
import config from "./startup/config.js";
import validation from "./startup/validation.js";
import prod from './startup/prod.js';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();


routes(app);
config(app);
validation();
prod(app); 

app.options('*', cors()); 

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


const port = process.env.PORT || 8000;
app.listen(port,'0.0.0.0', () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
