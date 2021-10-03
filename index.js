import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from "axios";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const cards = {};

app.get('/cards', (req, res) =>{
    console.log(`Cards: ${cards}`);
    res.send(cards);
});

app.post('/cards', async (req, res) =>{
    console.log('CREATE POST');
    const id = randomBytes(4).toString('hex');
    const { title } = req.body; 

    cards[id] = {
        id,
        title
    };

    await axios.post('http://localhost:4005/events', {type: "CardCreated", data: cards[id]});

    res.status(201).send(cards[id]);
});

app.post('/events', (req, res) => {
    console.log(`Received Event: ${req.body.type}`);

    res.send({});
});

app.listen(4000, () => {
    console.log("Listening to PORT 4000");
});