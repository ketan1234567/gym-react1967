const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Location = sequelize.define("Location", {
  name: DataTypes.STRING
});

module.exports = Location;