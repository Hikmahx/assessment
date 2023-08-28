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

// Uncomment the following line if you want a default route
// app.get("/", (req, res) => {
//   console.log("Hello world");
//   // return res.status(200).json({ message: "Hi there! This is a backend project for todo app for straitpay assessment. Check my GitHub: https://github.com/Hikmahx/assessment for more info" });
// });

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Route all other requests to the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

app.listen(PORT, () => console.log("This is listening on PORT: " + PORT));
