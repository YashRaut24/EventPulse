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

const csv = require("csv-parser");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const JWT_SECRET = process.env.JWT_SECRET || "eventpulse_jwt_secret_key_2024";
if (!JWT_SECRET) {
  console.warn('JWT_SECRET not set in .env - add JWT_SECRET=your_secret to backend/.env');
}

const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eventpulse";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/profile', require('./Routeing/ProfileRoute'));

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

// JWT Protect middleware
const protect = (req, res, next) => {
  let token;

  // Priority 1: Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  // Fallback: cookie
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      error: 'No token provided. Expected: Authorization: Bearer <token> OR cookie: token=<token>' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    let message = 'Invalid token';
    if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token signature';
    } else if (error.name === 'TokenExpiredError') {
      message = 'Token expired';
    }
    return res.status(401).json({ error: message });
  }
};

// Analytics helper functions
async function getSocialMediaAnalytics(platform) {
  console.log('🔍 Processing analytics for platform:', platform);
  
  return new Promise((resolve, reject) => {
    const filteredRows = [];
    const csvPath = path.join(__dirname, 'data', 'social_media.csv');
    
    console.log(`📂 Reading CSV from: ${csvPath}`);
    console.log(`🔎 Filtering for platform: "${platform}"`);
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        const rowPlatform = (row.platform || '').trim();
        const requestedPlatform = (platform || '').trim();
        
        if (rowPlatform === requestedPlatform) {
          filteredRows.push(row);
        }
      })
      .on('end', () => {
        console.log(`✅ Platform: ${platform}`);
        console.log(`📊 Rows found: ${filteredRows.length}`);
        
        let totalLikes = 0;
        let totalComments = 0;
        let totalShares = 0;
        
        filteredRows.forEach(row => {
          const likes = parseInt(row.likes) || 0;
          const comments = parseInt(row.comments) || 0;
          const shares = parseInt(row.shares) || 0;
          
          totalLikes += likes;
          totalComments += comments;
          totalShares += shares;
        });
        
        const reach = totalLikes + totalComments + (totalShares * 2);
        let engagementRate = 0;
        if (reach > 0) {
          engagementRate = ((totalLikes + totalComments + (totalShares * 2)) / reach) * 100;
        }
        
        const response = {
          totalLikes,
          totalComments,
          totalShares,
          reach,
          engagementRate: parseFloat(engagementRate.toFixed(2)),
          platform,
          rowCount: filteredRows.length
        };
        
        console.log(`💾 ${platform} Analytics Response:`, response);
        resolve(response);
      })
      .on('error', (err) => {
        console.error(`❌ CSV error for ${platform}:`, err.message);
        resolve({ 
          totalLikes: 0, 
          totalComments: 0, 
          totalShares: 0, 
          reach: 0, 
          engagementRate: 0,
          platform,
          rowCount: 0,
          error: err.message
        });
      });
  });
}

async function getCompanyAnalytics() {
  return new Promise((resolve, reject) => {
    const totals = { totalLikes: 0, totalComments: 0, totalShares: 0, totalReach: 0 };
    fs.createReadStream(path.join(__dirname, 'data', 'company_data.csv'))
      .pipe(csv())
      .on('data', (data) => {
        totals.totalLikes += parseInt(data.likes) || 0;
        totals.totalComments += parseInt(data.comments) || 0;
        totals.totalShares += parseInt(data.shares) || 0;
        totals.totalReach += parseInt(data.reach || data.shares) || 0;
      })
      .on('end', () => resolve(totals))
      .on('error', () => resolve(totals));
  });
}

// Analytics routes - Swishjam proxy
app.get('/api/analytics', async (req, res) => {
  try {
    const { platform } = req.query;
    console.log('═══════════════════════════════════════');
    console.log('📊 Analytics Request Received');
    console.log('Platform param:', platform || 'NONE');
    console.log('═══════════════════════════════════════');

    if (platform === 'Swish') {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: 'Swish API requires authentication' });
      }
      try {
        console.log('🔍 Swish Request - Platform:', platform, 'Token present:', !!token);
        const response = await axios.get('http://localhost:3000/api/analytics', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: req.query
          });
        console.log("Swish response:", response.data);
        
        const swishLikes = Number(response.data.totalLikes || response.data.likes) || 0;
        const swishComments = Number(response.data.totalComments || response.data.comments) || 0;
        const swishShares = response.data.totalShares || 0;
        const swishPosts = response.data.rowCount || response.data.totalPosts || 0;
        
        console.log('📤 Swish Raw Response:', {
          status: response.status,
          totalLikes: response.data.totalLikes,
          totalComments: response.data.totalComments,
          likesCount: swishLikes,
          commentsCount: swishComments
        });
        
        const normalized = {
          totalLikes: swishLikes,
          totalComments: swishComments,
          totalShares: 0,
          totalPosts: swishPosts,
          engagementRate: response.data.engagementRate || ((swishLikes + swishComments + swishShares * 2) / Math.max(1, swishPosts)) * 100,
          platform: 'Swish',
          rowCount: swishPosts
        };
        
        console.log('✅ Normalized Swish Response:', normalized);
        return res.json(normalized);
      } catch (error) {
        console.error('❌ Swish API error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
        } else if (error.response?.status) {
          return res.status(error.response.status).json(error.response.data);
        } else {
          return res.status(500).json({ error: 'Failed to fetch Swish analytics', message: error.message });
        }
      }
    }

    if (platform && ['Instagram', 'Twitter', 'Facebook'].includes(platform)) {
      const data = await getSocialMediaAnalytics(platform);
      return res.json(data);
    }

    if (platform === 'LinkedIn') {
      const data = await getCompanyAnalytics();
      return res.json(data);
    }

    return res.status(400).json({ error: 'Invalid or missing platform parameter' });

  } catch (error) {
    console.error('❌ Analytics error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
    } else if (error.response?.status) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ error: 'Failed to fetch analytics', message: error.message });
    }
  }
});

// Social media data endpoint
app.get('/api/social-media-data', (req, res) => {
  const { platforms } = req.query;
  if (!platforms) {
    return res.status(400).json({ error: 'Platforms parameter is required' });
  }

  let platformList = platforms.split(',').map(p => p.trim());
  platformList = platformList.map(p => p === 'GitHub' ? 'Facebook' : p);

  console.log('📋 Social Media Data Request');
  console.log('Requested platforms:', platformList);

  const platformTotals = {};
  let processed = 0;
  const errors = [];

  const processPlatform = async (platform, callback) => {
    try {
      if (platform === 'LinkedIn') {
        console.log(`\n🟦 LinkedIn - Using company_data.csv`);
        const data = await getCompanyAnalytics();
        platformTotals[platform] = data;
        console.log(`✅ LinkedIn totals:`, data);
        callback(null);
        return;
      }

      if (['Instagram', 'Twitter', 'Facebook'].includes(platform)) {
        console.log(`\n📱 ${platform} - Reading from social_media.csv`);
        const data = await getSocialMediaAnalytics(platform);
        platformTotals[platform] = data;
        console.log(`✅ ${platform} totals:`, data);
        callback(null);
        return;
      }

      console.warn(`⚠️  Unknown platform: ${platform}`);
      platformTotals[platform] = { 
        totalLikes: 0, 
        totalComments: 0, 
        totalShares: 0, 
        totalReach: 0, 
        error: 'Unknown platform' 
      };
      callback(null);
    } catch (err) {
      console.error(`❌ Error processing ${platform}:`, err.message);
      errors.push(err);
      callback(err);
    }
  };

  platformList.forEach(platform => {
    processPlatform(platform, (err) => {
      if (err) console.error(`Process error for ${platform}:`, err);
      processed++;
      if (processed === platformList.length) {
        console.log('\n═══════════════════════════════════════');
        console.log('📊 Final Response (All Platforms):');
        console.log(platformTotals);
        console.log('═══════════════════════════════════════\n');
        res.json(platformTotals);
      }
    });
  });
});

// Posts endpoint for social media feed
app.get('/api/posts', (req, res) => {
  const { platforms } = req.query;
  if (!platforms) {
    return res.status(400).json({ error: 'Platforms parameter is required' });
  }

  let platformList = platforms.split(',').map(p => p.trim());
  console.log('🔍 Posts request for platforms:', platformList);

  const results = [];
  const csvPath = path.join(__dirname, 'data', 'social_media.csv');
  
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => {
      const rowPlatform = (data.platform || '').trim();
      if (platformList.includes(rowPlatform)) {
        const post = {
          id: data.post_id,
          platform: rowPlatform,
          author: `${rowPlatform} User ${data.post_id}`,
          username: `${rowPlatform.toLowerCase()}_user_${data.post_id}`,
          content: `Sample post from ${rowPlatform} about Tech Conference 2024. Post type: ${data.post_type}. #TechConf2024`,
          timestamp: data.post_time,
          engagement: {
            likes: parseInt(data.likes) || 0,
            comments: parseInt(data.comments) || 0,
            shares: parseInt(data.shares) || 0
          },
          sentiment: data.sentiment_score
        };
        results.push(post);
      }
    })
    .on('end', () => {
      results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      const limitedResults = results.slice(0, 20);
      console.log(`✅ Found ${limitedResults.length} posts for platforms:`, platformList);
      res.json(limitedResults);
    })
    .on('error', (err) => {
      console.error('❌ Error reading CSV:', err);
      res.status(500).json({ error: 'Error processing data' });
    });
});

// Companies endpoint
app.get('/api/companies/findCompany', (req, res) => {
  const { companyId, companyName } = req.query;

  if (!companyId || !companyName) {
    return res.status(400).json({ error: 'companyId and companyName are required' });
  }

  const normalizedId = companyId.trim().toLowerCase();
  const normalizedName = companyName.trim().toLowerCase();

  const results = [];
  fs.createReadStream(path.join(__dirname, 'data', 'company_data.csv'))
    .pipe(csv())
    .on('data', (data) => {
      const rowId = data.id ? data.id.trim().toLowerCase() : '';
      const rowName = data.name ? data.name.trim().toLowerCase() : '';
      if (rowId === normalizedId && rowName === normalizedName) {
        results.push(data);
      }
    })
    .on('end', () => {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'Company not found' });
      }
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
      res.status(500).json({ error: 'Error processing data' });
    });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get("/api/health", (req, res) => res.json({ status: "OK", timestamp: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔐 JWT auth enabled`);
  console.log(`🌐 Google OAuth: ${GOOGLE_CLIENT_ID ? "enabled" : "disabled (set GOOGLE_CLIENT_ID in .env)"}`);
});
