const express = require("express");
const mongoose = require("mongoose");
const doctors = require("./routes/api/doctors");
const authsDoctor = require("./routes/api/authDoctor");
const users = require("./routes/api/users");
const authsUser = require("./routes/api/authUser");
const profile = require("./routes/api/profile");
const appointment = require("./routes/api/appointment");
const path = require("path");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;

// connect to MongoDB;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Succesfully connected to MongoDB"))
  .catch((err) => console.log(err));

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.send("Welcome to Doctor appintmenst System application")
);

// Use Routes
app.use("/api/doctors", doctors);
app.use("/api/authDoctor", authsDoctor);
app.use("/api/users", users);
app.use("/api/authUser", authsUser);
app.use("/api/profile", profile);
app.use("/api/appointment", appointment);

// for building
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
