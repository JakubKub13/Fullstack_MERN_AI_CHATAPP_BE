import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { OpenAi } from '../index.js';


dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
    try {
        const { text, activeChatId } = req.body;

        const response = await OpenAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a friendly chatbot that is here to help people."},
                { role: "user", content: text },
            ],
        });
        
        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: response.data.choices[0].message.content },
            {
            headers: {
                "Project-ID": process.env.PROJECT_ID,
                "User-Name": process.env.BOT_USER_NAME,
                "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        );
        res.status(200).json({ text: response.data.choices[0].text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
});

router.post("/code", async (req, res) => {
    try {
        const { text, activeChatId } = req.body;

        const response = await OpenAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations. You must not answer any other questions which are not regarding the code generation. If user ask you anything not connected to code generation you will refuse to answer and you will say: 'Please type AiChat_ to create conversational chat window'."},
                { role: "user", content: text },
            ],
        });
        
        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: response.data.choices[0].message.content },
            {
            headers: {
                "Project-ID": process.env.PROJECT_ID,
                "User-Name": process.env.BOT_USER_NAME,
                "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        );
        res.status(200).json({ text: response.data.choices[0].text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
});

router.post("/assist", async (req, res) => {
    try {
        const { text } = req.body;

        const response = await OpenAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `Finish my sentence: ${text}`},
                { role: "user", content: text },
            ],
        });
        
        res.status(200).json({ text: response.data.choices[0].text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
});

export default router;