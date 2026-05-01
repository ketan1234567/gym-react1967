const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gym_management", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err));

module.exports = sequelize;