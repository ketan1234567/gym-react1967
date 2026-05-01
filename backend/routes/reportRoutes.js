const router = require("express").Router();
const ctrl = require("../controllers/reportController");

router.get("/daily", ctrl.dailyReport);
router.get("/violations", ctrl.violations);

module.exports = router;