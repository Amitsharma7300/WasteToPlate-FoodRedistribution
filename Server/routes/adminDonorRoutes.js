const express = require("express");
const router = express.Router();


const { getAllDonors } = require("../controllers/adminDonorController");
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/donors", authMiddleware, verifyAdmin, getAllDonors);

module.exports = router;
