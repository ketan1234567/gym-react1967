const Employee = require('./Employee');
const Attendance = require('./AttendanceLog');
const Admin = require('./Admin');
const Location = require('./Location');

// 🔥 RELATIONS

// Employee → Attendance
Employee.hasMany(Attendance, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
  as: "attendanceLogs"
});

Attendance.belongsTo(Employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id"
});

// Admin → Location
Admin.belongsTo(Location, {
  foreignKey: "location_id"
});

Location.hasMany(Admin, {
  foreignKey: "location_id"
});

module.exports = {
  Employee,
  Attendance,
  Admin,
  Location
};