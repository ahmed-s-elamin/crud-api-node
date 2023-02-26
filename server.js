require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

//db configs
mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("database connected"));

//middleware
const empRouter = require("./routes/emps");
app.use("/emp", empRouter);

//port and listening
const port = process.env.PORT || 3030;
app.listen(port, () => console.log("server running"));
