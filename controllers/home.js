module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs")
  },
  getNetwork: (req,res) => {
    res.render("network.ejs")
  }
}
