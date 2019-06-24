require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      ctrl = require('./controller');
const app = express();
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

massive(CONNECTION_STRING).then((database) => {
    app.set('db', database);
    console.log('Database is connected!');
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port ${SERVER_PORT}`);
    });
});

// ENDPOINTS
app.post('/auth/register', ctrl.register); // REGISTERS A NEW USER
app.post('/auth/login', ctrl.login); // LOGS IN A USER