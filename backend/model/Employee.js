const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define("Employee", {
  employee_id: { type: DataTypes.STRING },
  name: DataTypes.STRING,
  department: DataTypes.STRING,
  status: DataTypes.STRING
}, {
  timestamps: false // ✅ FIX
});

module.exports = Employee;