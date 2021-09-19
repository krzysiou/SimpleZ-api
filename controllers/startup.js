const firstFunc = () => {
  return (req, res) => {
      res.json('Hello World')
  }
}

module.exports = { firstFunc }