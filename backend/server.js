const app = require("./app");

const sequelize = require("../backend/config/db");
sequelize.sync();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});