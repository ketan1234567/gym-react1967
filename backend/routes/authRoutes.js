const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

router.get("/login",  async (req, res) => {  res.json({
      msg: "Login successful",
   }); });

module.exports = router;