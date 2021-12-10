require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation, fileValidation} = require('./validation')

const showUsers = (users) => {
  return (req, res) => {
      res.status(200).json(users)
  }
}

const addUser = (users) => {
  return async (req, res) => {
    //Validate
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json({error: error.details[0].message})

    //check if username taken
    const user = users.find(user => user.name === req.body.name)
    if (user) {
        res.status(400).json({error: 'Name taken'})
        return
    }

    try {
      //Hashing
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const hashedEmail = await bcrypt.hash(req.body.email, 10)
      //Create User
      const user = {
        id: req.body.id,
        name: req.body.name,
        files: [],
        email: hashedEmail,
        password: hashedPassword
      }

      users.push(user);
      //generate jwt and return it
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
      res.status(201).json({
      id: user.id,
      accessToken: accessToken 
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

const loginUser = (users) => {
  return async (req, res) => {
      //Validation
      const { error } = loginValidation(req.body)
      if (error) return res.status(400).json({error: error.details[0].message})
      //find user
      const user = users.find(user => user.name === req.body.name)
      //if not found
      if (user == null) {
        return res.status(400).json({error: 'Cannot find user'})
      }
      try {
          //if password correct
          if(await bcrypt.compare(req.body.password, user.password)){
              //generate jwt and return it
              const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
              res.json({
              id: user.id,
              accessToken: accessToken 
              })
          } 
          //if incorrect password
          else {
          res.status(400).json({error: 'Incorrect password'})
          }
      } catch {
        res.status(500).send()
      }
  }
}
//return user files
const getFiles = (users) => {
  return async (req, res) => {
      const id = req.userData.id
      const user = users.find(user => user.id === id)
      if(user){
        res.status(200).json({files: user.files})
      } else{
        res.status(400).json()
      }
  }
}

const createFile = (users) => {
  return async (req, res) => {
    //Validation
    const { error } = fileValidation(req.body.file)
    if (error) return res.status(400).json({error: error.details[0].message})
    //create file
    const id = req.userData.id
    const user = users.find(user => user.id === id)
    if(user){
      user.files.push(req.body.file)
      res.status(201).json()
    } else{
      res.status(400).json({error: "bad request"})
    }
  }
}

const deleteFile = (users) => {
  return async (req, res) => {

    const fileId = req.body.fileId
    const userId = req.userData.id
    const user = users.find(user => user.id === userId)
    if(user){
      const file = user.files.find(file => file.id === fileId)
      for(let i = 0; i < user.files.length; i++){ 
        if ( user.files[i].id === fileId) { 
            user.files.splice(i, 1); 
        }
      }
      res.status(202).json()
    } else{
      res.status(400).json()
    }
  }
}

//return specific file
const loadFile = (users) => {
  return async (req, res) => {

    const fileId = req.body.fileId
    const userId = req.userData.id
    const user = users.find(user => user.id === userId)
    if(user){
      const file = user.files.find(file => file.id === fileId)
      res.status(202).json({file: file})
    } else{
      res.status(400).json()
    }
  }
}

//update file
const patchFile = (users) => {
  return async (req, res) => {

    const fileId = req.body.file.id
    const userId = req.userData.id
    const user = users.find(user => user.id === userId)
    if(user){
      const index = user.files.findIndex(file => file.id === fileId)
      user.files[index] = req.body.file
      res.status(202).json()
    } else{
      res.status(400).json()
    }
  }
}


module.exports = { showUsers, addUser, loginUser, getFiles, createFile, deleteFile, loadFile, patchFile }