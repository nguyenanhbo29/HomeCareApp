const express = require("express");
const {
  create,
  list,
  update,
  remove,
} = require("../controllers/booking.controller");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.use(authenticateToken);
router.post("/", create);
router.get("/", list);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
