const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

router.post("/registrate", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      const userWithoutPwd = await UserModel.findOne(
        { email: req.body.email },
        { password: 0 }
      );
      req.session.user = userWithoutPwd;
      res.status(200).send("Success!");
    } else {
      res.status(200).send("User already exists with this email!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const userWithoutPwd = await UserModel.findOne(
          { email: req.body.email },
          { password: 0 }
        );
        req.session.user = userWithoutPwd;
        res.status(200).send("Success!");
      } else {
        res.status(200).send("Wrong password!");
      }
    } else {
      res.status(200).send("User doesn't exist!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ user: req.session.user });
  } else {
    res.status(200).send("User is not logged in!");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).send("User logged out!");
});

module.exports = router;
