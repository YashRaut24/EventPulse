const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('JWT_SECRET not set in .env - add JWT_SECRET=your_secret to backend/.env');
}

const PORT = process.env.PORT || 9000;
const app = express();

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/profile', require('./Routeing/ProfileRoute'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

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
  
  console.log('EventPulse signing token for user:', user.email, 'with secret env:', !!process.env.JWT_SECRET);
  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  console.log('Token signed successfully, preview:', token.substring(0, 20) + '...');
  
  res.json({ 
    success: true, 
    user: { ...user, password: undefined }, 
    token 
  });
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
        
        // Exact platform match
        if (rowPlatform === requestedPlatform) {
          filteredRows.push(row);
        }
      })
      .on('end', () => {
        console.log(`✅ Platform: ${platform}`);
        console.log(`📊 Rows found: ${filteredRows.length}`);
        
        // Calculate totals from filtered rows
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
        
        // Calculate reach
        const reach = totalLikes + totalComments + (totalShares * 2);
        
        // Calculate engagement rate
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
        // Sum all company rows for LinkedIn metrics (adapt cols if different)
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
// ⚠️ NOTE: No 'protect' middleware - analytics data is read-only public CSV data
app.get('/api/analytics', async (req, res) => {
  try {
    const { platform } = req.query;
    console.log('═══════════════════════════════════════');
    console.log('📊 Analytics Request Received');
    console.log('Platform param:', platform || 'NONE');
    console.log('═══════════════════════════════════════');

    // Swish: Proxy to Swish API (forward auth)
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
        totalShares: 0, // Per task requirement
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

    // CSV-based platforms: Instagram, Twitter, Facebook
    if (platform && ['Instagram', 'Twitter', 'Facebook'].includes(platform)) {
      const data = await getSocialMediaAnalytics(platform);
      return res.json(data);
    }

    // LinkedIn - Company data CSV
    if (platform === 'LinkedIn') {
      const data = await getCompanyAnalytics();
      return res.json(data);
    }

    // If platform is not recognized, return error
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

// Upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

// Social media data endpoint
app.get('/api/social-media-data', (req, res) => {
  const { platforms } = req.query;
  if (!platforms) {
    return res.status(400).json({ error: 'Platforms parameter is required' });
  }

  let platformList = platforms.split(',').map(p => p.trim());
  // Replace GitHub with Facebook
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

      // Instagram, Twitter, Facebook - Use social_media.csv
      if (['Instagram', 'Twitter', 'Facebook'].includes(platform)) {
        console.log(`\n📱 ${platform} - Reading from social_media.csv`);
        const data = await getSocialMediaAnalytics(platform);
        platformTotals[platform] = data;
        console.log(`✅ ${platform} totals:`, data);
        callback(null);
        return;
      }

      // Unknown platform
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
        // Generate post data based on CSV row
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
      // Sort by post_time descending (most recent first)
      results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      // Limit to 20 posts for performance
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads available at http://localhost:${PORT}/uploads`);
});
