const router = require("express").Router();
const ctrl = require("../controllers/checkinController");

router.post("/checkin", ctrl.checkIn);
router.post("/checkout", ctrl.checkOut);

module.exports = router;