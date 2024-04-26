// const { createRequire } = require('module');
// const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const API_V1_TASKS = require("./api/v1/tasks");
const API_V1_AUTH = require("./api/v1/auth");
const API_V1_TOKEN = require("./api/v1/token");
const { authenticateToken } = require("./middlewares/auth")

const app = express()
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(morgan("combined"));

// app.all("/", (req, res) => res.redirect("/tasks"));
app.use("/api/v1/auth", API_V1_AUTH)
app.use("/api/v1/token", API_V1_TOKEN)
app.use("/api/v1/tasks", authenticateToken, API_V1_TASKS)
app.all("*",(req, res) => res.send("api at /api/v1"));

app.listen(port, `0.0.0.0`, () => {
  console.log(`Server is running on port ${port}`);
});
