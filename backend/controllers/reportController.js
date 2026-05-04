const ExcelJS = require("exceljs");
const { Employee, Attendance } = require("../model");

exports.downloadExcel = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: Attendance,
          as: "attendanceLogs",
          attributes: ["check_in_time", "check_out_time", "duration"]
        }
      ]
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Attendance Report");

    // 🔥 HEADER
    sheet.columns = [
      { header: "Employee ID", key: "employee_id", width: 15 },
      { header: "Name", key: "name", width: 20 },
      { header: "Department", key: "department", width: 15 },
      { header: "Check In", key: "check_in_time", width: 20 },
      { header: "Check Out", key: "check_out_time", width: 20 },
      { header: "Duration", key: "duration", width: 15 },
      { header: "Status", key: "status", width: 15 }
    ];

    // 🔥 DATA
    employees.forEach(emp => {
      const logs = emp.attendanceLogs || [];

      const latest = logs.sort(
        (a, b) => new Date(b.check_in_time) - new Date(a.check_in_time)
      )[0];

      sheet.addRow({
        employee_id: emp.employee_id,
        name: emp.name,
        department: emp.department,
        check_in_time: latest?.check_in_time || "-",
        check_out_time: latest?.check_out_time || "Active",
        duration: latest?.duration || "-",
        status: latest
          ? latest.check_out_time
            ? "Completed"
            : "Active"
          : "-"
      });
    });

    // 🔥 RESPONSE
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendance.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};