const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'face_locator'

    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

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

        res.json(database.users[0]);
    }
    else {
        res.status(400).json('error logging in');
    }

})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    db('users')
        .returning('*')
        .insert({
            email,
            name,
            joined: new Date()
        }).then(user => {
            res.json(user[0]);
        }).catch(err => res.status(400).json('Unable to register'))


})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then((user) => {
            res.json(user[0])

        }).catch((err) => {
            res.status(404).json(err);
        });

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