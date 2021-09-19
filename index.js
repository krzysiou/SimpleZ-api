const { firstFunc } = require('./controllers/startup.js');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

//managing room
app.get('/startup', firstFunc())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})