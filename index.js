const { json } = require('express');
const express = require('express')
const checkAuth = require('./controllers/check-auth')
const app = express()
const port = 3000


const rooms = [];
const users = [];

app.use(express.json())

//managing room
//app.get('/rooms', checkRooms(rooms))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})