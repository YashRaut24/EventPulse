const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient } = require("mongodb");
const path = require("path");
const fs = require("fs");
require('dotenv').config();
const ProfileRoute = require("./Routeing/ProfileRoute");

const mongoUrl = process.env.MONGO_URI;
const PORT = process.env.PORT || 9000;

const app = express();

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

app.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  res.json({ url: `http://localhost:9000/uploads/${req.file.filename}` });
});

app.post("/api", ProfileRoute);

app.listen(PORT, () => console.log("Server is running!"));
