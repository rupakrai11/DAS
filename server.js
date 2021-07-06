const express = require("express");
const connectDB = require("./config/db");

// connectig the database
connectDB();
// init middleware
const app = express();
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.json({ msg: "welcome to the  digital administration system " })
);
// define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/birthregistration", require("./routes/birthregistration"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
