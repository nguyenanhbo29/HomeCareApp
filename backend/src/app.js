const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/users", require("./routes/user.routes"));
module.exports = app;
