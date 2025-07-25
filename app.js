const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI_PROD;
const port = process.env.PORT || 5000;
const app = express();

console.log(mongoURI);
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => console.log(`Server is running on port ${port}`));
