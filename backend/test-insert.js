const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  const adminPass = await bcrypt.hash("admin123", 10);
  const managerPass = await bcrypt.hash("manager123", 10);

  console.log("Admin:", adminPass);
  console.log("Manager:", managerPass);
};

hashPassword();