const { showUsers, addUser, loginUser, getFiles, createFile, deleteFile, loadFile, patchFile } = require('./controllers/userControl.js');
const checkAuth = require('./controllers/check-auth')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const cors = require('cors')
app.use(express.json())

const users = []

//managing users
app.get('/users', showUsers(users))
app.post('/users/register', addUser(users))
app.post('/users/login', loginUser(users))
app.post('/users/files', checkAuth, getFiles(users))
app.post('/users/files/create', checkAuth, createFile(users))
app.post('/users/files/delete', checkAuth, deleteFile(users))
app.post('/users/files/load', checkAuth, loadFile(users))
app.patch('/users/files/edit', checkAuth, patchFile(users))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})