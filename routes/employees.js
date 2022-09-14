const express = require("express");
const router = express.Router();
const Employee = require("../models/emp");

// getting all emps
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one emp
router.get("/:id", getEmp, (req, res) => {
  res.json(res.employee);
});

//creating emp
router.post("/", async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    job: req.body.job,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating emp
router.patch("/:id", getEmp, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.job != null) {
    res.employee.job = req.body.job;
  }
  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting emp

router.delete("/:id", getEmp, async (req, res) => {
  try {
    res.employee.remove();
    res.json({ message: "Employee was deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEmp(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: "employee not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.employee = employee;

  next();
}

module.exports = router;
