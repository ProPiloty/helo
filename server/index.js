require('dotenv').config();
const express = require('express'),
      massive = require('massive');
const app = express();
const {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then((database) => {
    app.set('db', database);
    console.log('Database is connected!');
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port ${SERVER_PORT}`);
    });
});
