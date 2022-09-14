require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const empRouter = require("./routes/employees");
app.use("/employees", empRouter);

app.listen(3000, () => console.log("server running"));
