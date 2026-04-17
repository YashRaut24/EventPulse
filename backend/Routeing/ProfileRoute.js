const app = require("express");
const router = app.Router();
const { MongoClient } = require("mongodb");
const axios = require("axios");

const mongoUrl = 'mongodb://localhost:27017';

router.post("/save", async (req, res) => {
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

router.get("/swish/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const response = await axios.get(
      `http://localhost:3000/api/analytics/user/${userId}`
    );

    res.status(200).json(response.data);

  } catch (err) {
    console.error("Swish fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch Swish data" });
  }
});

module.exports = router;
