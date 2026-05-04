const router = require("express").Router();
const ctrl = require("../controllers/reportController");

// router.get("/daily", ctrl.dailyReport);
// router.get("/violations", ctrl.violations);
router.get("/download-excel", ctrl.downloadExcel);

module.exports = router;