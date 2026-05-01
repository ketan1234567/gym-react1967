const Employee = require("../model/Employee");
const Attendance = require("../model/AttendanceLog");
const { Op, fn, col } = require("sequelize");

// 🔥 IMPORTANT: association
Attendance.belongsTo(Employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id"
});

exports.getChartData = async (req, res) => {
  try {

    // ✅ Active Sessions
    const activeSessions = await Attendance.findAll({
      where: { check_out_time: null },
      include: [
        {
          model: Employee,
          attributes: ["name"]
        }
      ]
    });

    // ✅ Location Stats (FIXED)
    const locationStatsRaw = await Attendance.findAll({
      attributes: [
        "location_id",
        [fn("COUNT", col("location_id")), "count"]
      ],
      group: ["location_id"]
    });

    // ✅ FORMAT (VERY IMPORTANT)
    const locationStats = locationStatsRaw.map(l => ({
      location: "Location " + l.location_id,
      count: Number(l.get("count"))
    }));

    res.json({
      activeSessions,
      locationStats,
      recentCheckIns: []
    });

  } catch (err) {
    console.error("Dashboard ERROR:", err); // 🔥 debug
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.count();

    const today = new Date().toISOString().slice(0, 10);

    const todayCheckIns = await Attendance.count({
      where: { date: today }
    });

    const currentlyActive = await Attendance.count({
      where: { check_out_time: null }
    });

    res.json({
      totalEmployees,
      todayCheckIns,
      currentlyActive,
      maxCapacity: 50
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};