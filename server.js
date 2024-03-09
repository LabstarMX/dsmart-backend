const PORT = 8000;
const FRONTENDURL = `http://localhost:5173`;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const cors = require('cors')
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const entries = require('./controllers/entries')
const profile = require('./controllers/profile')
const order = require('./controllers/order')


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //MODIFY TO THE ONLINE DATABASE LOCATION BEFORE DEPLOYING
        user: 'postgres',
        password: process.env.DSMARTDBSECRET,
        database: 'dsmartluxurycollections'
    }
});
app.use(cors({
    origin: FRONTENDURL,
}));
app.use(bodyParser.json());



app.get('/', (req, res) => { res.send("DSMART BACKEND IS WORKING!") })
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.put('/entries', (req, res) => { entries.handleEntries(req, res, db ) })
app.post('/order', (req, res) => { order.handleOrder(req, res, db ) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db ) })


app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${process.env.PORT}`))
