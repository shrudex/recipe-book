import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/Users.js";

const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: email });
  if (user) {
    return res.json({ message: "⚠️ User already exists!", color: "red" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    username,
  });
  await newUser.save();
  res.json({ message: "✅ User registered successfully!", color: "green" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.json({ message: "👤 User does not exist!" });
  }
  const valid = await bcrypt.compare(password, user.password);
  console.log(user);
  if (!valid) {
    return res.json({ message: "⚠️ Invalid credentials!" });
  }
  const token = jsonwebtoken.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

router.post("/getUser", async (req, res) => {
  const { userID } = req.body;
  const user = await User.findById(userID);
  res.json(user);
});

export { router as usersRouter };
