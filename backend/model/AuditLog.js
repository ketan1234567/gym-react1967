const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AuditLog = sequelize.define("AuditLog", {
  action: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  description: DataTypes.TEXT
});

module.exports = AuditLog;