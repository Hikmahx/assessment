const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

// CORS
app.use(cors());

// ROUTES
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/todos", require("./routes/todoRoute"));

app.get("/", () => {
  console.log("Hello world");
  // return res.status(200).json({ message: "Hi there! This is a backend project for todo app for straitpay assessment. Check my GitHub: https://github.com/Hikmahx/assessment for more info" });
});

app.listen(PORT, () => console.log("This is listening on PORT: " + PORT));