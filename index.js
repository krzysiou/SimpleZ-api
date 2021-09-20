const { showUsers } = require('./controllers/userControl.js');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const users = []

//managing users
app.get('/users', showUsers(users))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})