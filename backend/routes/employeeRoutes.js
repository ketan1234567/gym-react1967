const router = require("express").Router();
const controller = require("../controllers/employeeController");

router.get("/", controller.getAllEmployees);
//router.get("/search", controller.searchEmployee);

module.exports = router;