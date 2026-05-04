const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Location = sequelize.define("Location", {
  name: DataTypes.STRING
}, {
  timestamps: false   // ✅ VERY IMPORTANT
});

module.exports = Location;