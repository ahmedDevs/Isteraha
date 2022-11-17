module.exports = {
  getIndex: (req, res) => {
    res.render("index");
  },
  getNetwork: (req,res) => {
    res.render("network")
  }
};
