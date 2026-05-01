const express = require("express");
const app = express();
const cors = require('cors');
const sequelize = require("./config/db");

app.use(express.json());
app.use(cors());          // ✅ correct
 

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api", require("./routes/checkinRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

app.use("/api/dashboard", require("./routes/dashboardRoutes"));



app.use("/api/auth", require("./routes/authRoutes"));

sequelize.sync();

module.exports = app;

