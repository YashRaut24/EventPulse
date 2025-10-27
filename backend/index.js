const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require('dotenv').config();

const PORT = process.env.PORT || 9000;
const app = express();

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// In-memory storage for demo
let users = [];
let events = [];
let analytics = {
  totalEvents: 156,
  totalUsers: 1247,
  engagement: 89.5,
  growth: 12.3
};

// Auth routes
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const user = {
    id: Date.now().toString(),
    firstName: name.split(' ')[0] || name,
    lastName: name.split(' ')[1] || '',
    email,
    password,
    company: '',
    jobTitle: '',
    phone: '',
    website: '',
    bio: '',
    profileImage: 'https://via.placeholder.com/150x150?text=User',
    createdAt: new Date().toISOString(),
    plan: 'Free'
  };
  
  users.push(user);
  res.json({ success: true, user: { ...user, password: undefined } });
});

app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({ success: true, user: { ...user, password: undefined } });
});

// User routes
app.put('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json({ success: true, user: { ...users[userIndex], password: undefined } });
});

// Events routes
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const event = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  events.push(event);
  res.json({ success: true, event });
});

// Analytics routes
app.get('/api/analytics', (req, res) => {
  res.json(analytics);
});

// Upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads available at http://localhost:${PORT}/uploads`);
});
