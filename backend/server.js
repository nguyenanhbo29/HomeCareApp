require("dotenv").config();

console.log(process.env.MONGO_URI);
const app = require("./src/app");
const connectDatabase = require("./src/config/database");

const PORT = process.env.PORT || 5001;

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
