import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import { Configuration, OpenAIApi } from "openai";


dotenv.config();



const configration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

// console.log(configration);

const openai = new OpenAIApi(configration);
const app = express();


// middlewares

app.use(cors());

app.use(express.json());


app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hello Form CodeX"
    })

});


app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`${prompt}`,
            temperature: 0,
            max_tokens: 300,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            error: error.message,
        })
    }
});




app.listen(5000, () => console.log('App is running on port 5000 || http://localhost:5000'))