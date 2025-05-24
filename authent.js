const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("./user");
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email does not exists!!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password!!" });

    const token = jwt.sign({ id: user._id }, "hakunamatata", {
      expiresIn: "1h",
    });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;