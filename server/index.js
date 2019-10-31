require('dotenv').config();
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
const express = require('express');
const app = express();
app.use(express.json());
const massive = require('massive');
const session = require('express-session');
const {register, login, logout, userSession} = require('./controllers/userController')

app.use(session({
secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    coookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

massive(CONNECTION_STRING).then(db => {
    console.log('Database connected!');
    db.init().then(() => {
        app.set("db", db);
    });
}).catch(err => console.log(err))

// app.get('/api/test', (req,res,next) => {
//     const db = req.app.get('db');
//     db.query('SELECT * FROM users;').then(users => {
//         res.status(200).send(users);
//     })
// })

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/user_session', userSession);
app.delete('/auth/logout', logout);

app.get('/api/inventory', (req,res,next) => {
    const db = req.app.get('db');
    db.query('SELECT * FROM inventory;').then((inventory) => {
        res.status(200).send(inventory);
    })
})

let port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}.`));