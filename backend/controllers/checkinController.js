const Attendance = require("../model/AttendanceLog");

exports.checkIn = async (req, res) => {
  const { employee_id, location_id } = req.body;
  

  const active = await Attendance.count({
    where: { check_out_time: null }
  });

  if (active >= 50) {
    return res.status(400).json({ msg: "Gym full" });
  }

  const already = await Attendance.findOne({
    where: { employee_id, date: new Date().toISOString().slice(0,10) }
  });

  if (already) {
    return res.status(400).json({ msg: "Already used today" });
  }

  const log = await Attendance.create({
    employee_id,
    location_id,
    check_in_time: new Date(),
    date: new Date()
  });

  res.json(log);
};

exports.checkOut = async (req, res) => {
  const { employee_id } = req.body;

  const log = await Attendance.findOne({
    where: { employee_id, check_out_time: null }
  });

  if (!log) return res.status(400).json({ msg: "Not checked in" });

  const now = new Date();
  const duration = Math.floor((now - log.check_in_time) / 60000);

  log.check_out_time = now;
  log.duration = duration;

  await log.save();

  res.json(log);
};