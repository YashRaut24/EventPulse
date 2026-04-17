const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require("dotenv").config();

const PORT = process.env.PORT || 9000;
const JWT_SECRET = process.env.JWT_SECRET || "eventpulse_jwt_secret_key_2024";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eventpulse";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(session({ secret: JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect(MONGO_URI).catch(err => console.log("MongoDB not connected, using in-memory fallback:", err.message));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  googleId: String,
  company: { type: String, default: "" },
  jobTitle: { type: String, default: "" },
  phone: { type: String, default: "" },
  website: { type: String, default: "" },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  specialties: { type: [String], default: [] },
  profileImage: { type: String, default: "" },
  plan: { type: String, default: "Free" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// In-memory fallback when MongoDB is not available
let inMemoryUsers = [];

const findUser = async (query) => {
  try {
    if (mongoose.connection.readyState === 1) return await User.findOne(query);
    if (query.email) return inMemoryUsers.find(u => u.email === query.email) || null;
    if (query._id) return inMemoryUsers.find(u => u._id === query._id) || null;
    if (query.googleId) return inMemoryUsers.find(u => u.googleId === query.googleId) || null;
    return null;
  } catch { return null; }
};

const saveUser = async (userData) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = new User(userData);
      return await user.save();
    }
    const user = { _id: Date.now().toString(), ...userData };
    inMemoryUsers.push(user);
    return user;
  } catch (err) { throw err; }
};

const updateUser = async (id, data) => {
  try {
    if (mongoose.connection.readyState === 1) return await User.findByIdAndUpdate(id, data, { new: true });
    const idx = inMemoryUsers.findIndex(u => u._id === id);
    if (idx === -1) return null;
    inMemoryUsers[idx] = { ...inMemoryUsers[idx], ...data };
    return inMemoryUsers[idx];
  } catch { return null; }
};

// JWT middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const generateToken = (user) =>
  jwt.sign({ id: user._id?.toString(), email: user.email }, JWT_SECRET, { expiresIn: "7d" });

const safeUser = (user) => {
  const u = user.toObject ? user.toObject() : { ...user };
  delete u.password;
  return u;
};

// Google OAuth Strategy
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/api/auth/google/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await findUser({ googleId: profile.id });
      if (!user) {
        user = await findUser({ email: profile.emails[0].value });
        if (user) {
          await updateUser(user._id?.toString(), { googleId: profile.id });
        } else {
          user = await saveUser({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0]?.value || "",
            plan: "Free"
          });
        }
      }
      done(null, user);
    } catch (err) { done(err, null); }
  }));

  passport.serializeUser((user, done) => done(null, user._id?.toString()));
  passport.deserializeUser(async (id, done) => {
    const user = await findUser({ _id: id });
    done(null, user);
  });
}

// ─── Auth Routes ────────────────────────────────────────────────────────────

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, company, eventType } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Name, email and password are required" });

  const existing = await findUser({ email });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await saveUser({
    firstName: name.split(" ")[0],
    lastName: name.split(" ").slice(1).join(" "),
    email,
    password: hashed,
    company: company || "",
    plan: "Free"
  });

  const token = generateToken(user);
  res.json({ success: true, token, user: safeUser(user) });
});

app.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const user = await findUser({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // Support legacy plain-text passwords (migrate on login)
  let valid = false;
  if (user.password?.startsWith("$2")) {
    valid = await bcrypt.compare(password, user.password);
  } else {
    valid = user.password === password;
    if (valid) {
      const hashed = await bcrypt.hash(password, 10);
      await updateUser(user._id?.toString(), { password: hashed });
    }
  }

  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ success: true, token, user: safeUser(user) });
});

// Google OAuth routes
app.get("/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/api/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${CLIENT_URL}/login?error=google_failed` }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// ─── User Routes ─────────────────────────────────────────────────────────────

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  const user = await findUser({ _id: req.user.id });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user: safeUser(user) });
});

app.put("/api/user/:id", authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.id) return res.status(403).json({ error: "Forbidden" });
  const updated = await updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "User not found" });
  res.json({ success: true, user: safeUser(updated) });
});

// Profile save (legacy route kept for Profile.jsx compatibility)
app.post("/save", authMiddleware, async (req, res) => {
  try {
    const updated = await updateUser(req.user.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, user: safeUser(updated) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ─── Upload ──────────────────────────────────────────────────────────────────

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post("/api/upload", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

app.post("/upload-avatar", authMiddleware, upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

// ─── Other Routes ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => res.json({ status: "OK", timestamp: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔐 JWT auth enabled`);
  console.log(`🌐 Google OAuth: ${GOOGLE_CLIENT_ID ? "enabled" : "disabled (set GOOGLE_CLIENT_ID in .env)"}`);
});
