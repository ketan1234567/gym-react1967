const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Upload = sequelize.define("Upload", {
  file_name: DataTypes.STRING
});

module.exports = Upload;