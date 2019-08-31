const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },

        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ]

}

app.get('/', (req, res) => {

    res.send(database.users);
})

app.post('/signin', (req, res) => {

    console.log(`Email ${req.body.email} and password ${req.body.password}`)

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {

        res.json('success');
    }
    else {
        res.status(400).json('error logging in');
    }

})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash)
    });

    database.users.push({
        id: '125',
        name,
        email,
        password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length - 1]);

})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user);
        }
    })

    res.status(404).json("User not found");

})

app.put('/image', (req, res) => {

    const { id } = req.body;
    database.users.forEach(user => {
        if (user.id === id) {
            user.entries++;
            return res.json(user.entries);
        }
    })

    res.status(404).json("User not found");
})


app.listen(3005, () => {
    console.log('app is running on port 3005');
})