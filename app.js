const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = "mongodb://localhost:27017/todo_db";
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => console.log(`Server is running on port ${port}`));
