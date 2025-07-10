const express = require("express");
const router = express.Router();


const { getAllDonors } = require("../controllers/admindonorController");
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/donors", authMiddleware, verifyAdmin, getAllDonors);

module.exports = router;
