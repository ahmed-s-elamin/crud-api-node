const express = require("express");
const router = express.Router();
const Emp = require("../models/emp");

// getting all emps
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one emp
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//creating emp
router.post("/", async (req, res) => {
  const emp = new Emp({
    title: req.body.title,
    author: req.body.author,
    age: req.body.age,
    job: req.body.job,
  });

  try {
    const newEmp = await emp.save();
    res.status(201).json(newEmp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating user
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.job != null) {
    res.user.job = req.body.job;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting user

router.delete("/:id", getUser, async (req, res) => {
  try {
    res.user.remove();
    res.json({ message: "User was deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "user not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;

  next();
}

module.exports = router;
