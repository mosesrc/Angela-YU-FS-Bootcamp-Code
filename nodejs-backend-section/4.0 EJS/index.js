import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
const __dirname1 = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const today = new Date();
    const day = today.getDay();
    let type = 'a weekday';
    let adv = 'it\'s time to work hard'

    if (day === 0 || day === 6) {
        type = 'the weekend';
        adv = 'it\'s time to have some fun'
    }
    res.render("index.ejs", { dayType: type, advice: adv })
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});