const { showUsers, addUser, loginUser, getFiles, createFile } = require('./controllers/userControl.js');
const checkAuth = require('./controllers/check-auth')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const users = []

//managing users
app.get('/users', showUsers(users))
app.post('/users/register', addUser(users))
app.post('/users/login', loginUser(users))
app.post('/users/files', checkAuth, getFiles(users))
app.post('/users/files/create', checkAuth, createFile(users))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})