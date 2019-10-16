require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('./controller')
const cors = require('cors')
const session = require('express-session')


const {SERVER_PORT,CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}))


app.post('/auth/logout', ctrl.logout)
app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)

massive(CONNECTION_STRING).then(db => {
    app.set('db',db)

 app.listen(SERVER_PORT, () => console.log(`live on ${SERVER_PORT} 🚀 `))

})


