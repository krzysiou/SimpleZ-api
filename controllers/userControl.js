const addUser = (users) => {
  return (req, res) => {
    //ADD HASHING
    const user = {
      id: req.body.id,
      name: req.body.name,
      email: hashedEmail,
      password: hashedPassword
    }
    users.push(user);
    res.status(201).json()
  }
}

const showUsers = (users) => {
  return (req, res) => {
      res.status(200).json(users)
  }
}

module.exports = { showUsers }