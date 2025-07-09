require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
const authenticate = require('./middleware/authenticate');
const authorizeRoles = require('./middleware/authorize');
const path = require('path');
const publicationRoutes = require('./routes/Admin/publicationRoutes');
const validateRoute = require('./routes/Auth/validate');
const userRoutes = require('./routes/Auth/userRoutes');
const bookRequestRoutes = require('./routes/Author/bookRequestRoutes');
const adminRoutes = require('./routes/Admin/adminRoutes');
const blogRoutes = require('./routes/Blog/blogRoutes');
const commentRoutes = require('./routes/Comments/commentRoutes');
const viewerRoutes = require('./routes/Viewer/viewerRoutes');
const pubroutes = require('./routes/Public/publicroutes');
app.use('/api/comments', commentRoutes);
app.use('/api/books', bookRequestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', validateRoute);
app.use('/api/userdata', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/viewer', viewerRoutes);
app.use('/api/public', pubroutes);

// Middleware to parse JSON
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
