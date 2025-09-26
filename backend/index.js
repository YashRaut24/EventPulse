const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient } = require("mongodb");
const path = require("path");
const fs = require("fs");
require('dotenv').config();

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

app.post("/save", async (req, res) => {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db("profileUpdate");
    const collec = db.collection("profileInfo");

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      location: req.body.location,
      bio: req.body.bio,
      website: req.body.website,
      specialties: req.body.specialties || [],
      avatar: req.body.avatar || ""
    };

    const result = await collec.insertOne(data);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save profile" });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("Server is running!"));
