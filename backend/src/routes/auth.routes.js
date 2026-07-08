const express = require("express");
const {
  register,
  login,
  profile,
  updateProfile,
  changePassword,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, profile);
router.put("/profile", authenticateToken, updateProfile);
router.put("/change-password", authenticateToken, changePassword);

module.exports = router;
