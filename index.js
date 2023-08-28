import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from './routes/openai.js';
import authRoutes from './routes/auth.js';

/* Configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

/* OPEN AI CONFIGURATION */
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, 
});

export const OpenAi = new OpenAIApi(configuration);

/* ROUTES */
app.use('/openai', openAiRoutes)
app.use('/auth', authRoutes)



/* SERVER START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});

