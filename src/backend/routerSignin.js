const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./modelUser");

router.post("/signin", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email or password");
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
