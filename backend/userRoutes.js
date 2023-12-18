const express = require("express");
const router = express.Router();
const { signup, login, updateProfile } = require("./userController");
const verifyToken = require("./authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.patch("/update-profile", verifyToken, updateProfile);

module.exports = router;
