const { Op } = require("sequelize");
const { Employee, Attendance } = require("../model");

exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;

    const { search, department, status } = req.query;

    const where = {};

    // 🔍 SEARCH (only matching records)
    if (search) {
      const query = search.trim();

      where[Op.or] = [
        { name: { [Op.like]: `%${query}%` } },
        { employee_id: { [Op.like]: `%${query}%` } },
        { department: { [Op.like]: `%${query}%` } }
      ];

      // 🔥 Disable pagination during search (show all matching)
      limit = null;
      offset = null;
    }

    // 📂 DEPARTMENT FILTER
    if (department && department !== "all") {
      where.department = department;
    }

    // 🔥 STATUS FILTER
    let attendanceWhere;

    if (status === "active") {
      attendanceWhere = { check_out_time: null };
    } else if (status === "completed") {
      attendanceWhere = { check_out_time: { [Op.ne]: null } };
    }

    // 🔥 MAIN QUERY
    const { count, rows } = await Employee.findAndCountAll({
      where,
      attributes: ["employee_id", "name", "department", "status"],
      include: [
        {
          model: Attendance,
          as: "attendanceLogs",
          attributes: ["check_in_time", "check_out_time", "duration"],
          required: status !== "all",
          ...(attendanceWhere && { where: attendanceWhere }),
          separate: true,          // ✅ avoids duplicates
          limit: 1,                // ✅ latest record only
          order: [["check_in_time", "DESC"]]
        }
      ],
      ...(limit && { limit }),
      ...(offset && { offset }),
      distinct: true
    });

    // 🔥 FORMAT RESPONSE
    const employees = rows.map(emp => {
      const latest = emp.attendanceLogs?.[0];

      return {
        employee_id: emp.employee_id,
        name: emp.name,
        department: emp.department,
        status: emp.status,
        check_in_time: latest?.check_in_time || null,
        check_out_time: latest?.check_out_time || null,
        duration: latest?.duration || null,
        session_status: latest
          ? latest.check_out_time
            ? "Completed"
            : "Active"
          : "-"
      };
    });

    // 🔥 SORT (latest check-in first)
    employees.sort((a, b) => {
      return new Date(b.check_in_time || 0) - new Date(a.check_in_time || 0);
    });

    // 🔥 RESPONSE
    res.json({
      employees,
      pagination: search
        ? null // ❌ no pagination during search
        : {
            total: count,
            page,
            limit,
            pages: Math.ceil(count / limit)
          }
    });

  } catch (err) {
    console.error("Employee Error:", err);
    res.status(500).json({ error: err.message });
  }
};