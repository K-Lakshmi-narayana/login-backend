const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./authent"));

app.listen(5000, () => console.log("Server started on port 5000"));
