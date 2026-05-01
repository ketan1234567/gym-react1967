const Attendance = require("../model/AttendanceLog");

exports.dailyReport = async (req, res) => {
  const data = await Attendance.findAll();
  res.json(data);
};

exports.violations = async (req, res) => {
  const data = await Attendance.findAll({
    where: { duration: { [require("sequelize").Op.gt]: 120 } }
  });
  res.json(data);
};