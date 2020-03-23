const express = require('express')
const routes = require('./routes')
const app = express()
const session = require('express-session');

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'asdasas%#$%aS3',
    cookie: { maxAge: 86400000 }
}
));

app.use(express.json());
app.use(routes)

app.listen(5555)