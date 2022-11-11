const express = require("express");
const router = express.Router();
const User = require("../models/user");

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
  const user = new User({
    name: req.body.name,
    job: req.body.job,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating emp
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

//deleting emp

router.delete("/:id", getUser, async (req, res) => {
  try {
    res.employee.remove();
    res.json({ message: "Employee was deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
