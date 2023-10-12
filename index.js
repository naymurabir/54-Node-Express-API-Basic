const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())

const users = [
    { id: 1, name: 'Naymur Rahman', email: 'naymur@gmail.com' },
    { id: 2, name: 'Sinthia Tabassum', email: 'sinthia@gmail.com' },
    { id: 3, name: 'Sidratul Muntaha', email: 'sidratul@gmail.com' },
]

app.get('/', (req, res) => {
    res.send("Users management server is running...")
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    res.send(user)
})


app.post('/users', (req, res) => {
    console.log("POST API is hitting...");
    console.log(req.body);

    const newUser = req.body
    newUser.id = users.length + 1;
    users.push(newUser)
    res.send(newUser)
})

app.listen(port, () => {
    console.log(`The server is running on: ${port}`);
})