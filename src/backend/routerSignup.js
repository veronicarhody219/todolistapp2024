const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./modelUser");

router.post("/signup", async (req, res) => {
  try {
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({email, password: hashedPassword});
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
