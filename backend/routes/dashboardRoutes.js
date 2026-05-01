const router = require("express").Router();
const controller = require("../controllers/dashboardController");

router.get("/stats", controller.getStats);
router.get("/chart-data", controller.getChartData);

module.exports = router;