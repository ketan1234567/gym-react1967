const Employee = require("../model/Employee");
const { Op } = require("sequelize");

// 🔹 Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { search, department, status } = req.query;

    const where = {};

    // 🔍 SEARCH
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { employee_id: { [Op.like]: `%${search}%` } }
      ];
    }

    // 📂 DEPARTMENT FILTER
    if (department && department !== "all") {
      where.department = department;
    }

    // 🔥 STATUS FILTER (fix case issue)
    if (status && status !== "all") {
      where.status = status.charAt(0).toUpperCase() + status.slice(1);
    }

    const { count, rows } = await Employee.findAndCountAll({
      where,
      attributes: ["employee_id", "name", "department", "status"],
      limit,
      offset
    });

    res.json({
      employees: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit)
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 Search employee (for your input box)
exports.searchEmployee = async (req, res) => {
  try {
    const { query } = req.query;

    const employees = await Employee.findAll({
      where: {
        status: "Active",
        [Op.or]: [
          { employee_id: { [Op.like]: `%${query}%` } },
          { name: { [Op.like]: `%${query}%` } }
        ]
      },
      attributes: ["employee_id", "name", "department"],
      limit: 10
    });

    res.json(employees);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};