const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AttendanceLog = sequelize.define("AttendanceLog", {
  employee_id: DataTypes.STRING,
  location_id: DataTypes.INTEGER,
  check_in_time: DataTypes.DATE,
  check_out_time: DataTypes.DATE,
  duration: DataTypes.INTEGER,
  date: DataTypes.DATEONLY
});

module.exports = AttendanceLog;