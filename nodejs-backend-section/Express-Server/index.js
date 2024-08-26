import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('In get Request');
    res.send('<h1>Home Page<h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Me</h1>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Me</h1>');
});

app.post('/register', (req, res) => {
    res.sendStatus(200);
});

app.put('/user/ryan', (req, res) => {
    res.sendStatus(200);
});

app.patch('/user/ryan', (req, res) => {
    res.sendStatus(200);
});

app.delete('/user/id', (req, res) => {
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});