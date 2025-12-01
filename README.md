# Cool-Reads 📚

A comprehensive full-stack web application for book management, publishing, and social interaction. Cool-Reads provides a complete ecosystem for authors to publish their work, admins to manage content, and readers to discover and engage with books.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 Features

### For Readers (Viewers)

- **Browse Books**: Explore a vast collection of published books
- **Public Access**: View content without authentication
- **Comments & Reviews**: Share thoughts and opinions on books and blogs
- **Blog Section**: Read articles from authors and admins
- **Help Center**: Submit queries and get support

### For Authors

- **Book Publishing**: Upload and request publication for your books
- **Content Management**: Manage your published works
- **Blog Writing**: Create and manage blog posts
- **Request Tracking**: Monitor the status of publication requests
- **Author Dashboard**: Centralized view of all your content

### For Administrators

- **Publication Control**: Approve or reject book publication requests
- **User Management**: Oversee all user accounts and activities
- **Content Moderation**: Manage books, blogs, and user-generated content
- **Help Center Management**: View and respond to user queries
- **Notification System**: Track and manage all platform notifications
- **Analytics Dashboard**: Monitor platform activity and engagement

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (React)                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐      │
│  │  Admin  │  │ Author  │  │ Viewer  │  │  Public  │      │
│  │Dashboard│  │Dashboard│  │  Pages  │  │   View   │      │
│  └─────────┘  └─────────┘  └─────────┘  └──────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                      REST API (Axios)
                            │
┌───────────────────────────┴─────────────────────────────────┐
│              Backend Layer (Node.js + Express)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Routes  │  │ Book Routes  │  │ Blog Routes  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ User Routes  │  │ Help Routes  │  │ File Upload  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────────────────────┬─────────────────────────────────┘
                            │
                      Mongoose ODM
                            │
┌───────────────────────────┴─────────────────────────────────┐
│                    Database Layer (MongoDB)                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐      │
│  │  Users  │  │  Books  │  │  Blogs  │  │Requests  │      │
│  └─────────┘  └─────────┘  └─────────┘  └──────────┘      │
│  ┌─────────┐  ┌─────────┐                                  │
│  │Comments │  │  Help   │                                  │
│  └─────────┘  └─────────┘                                  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- MongoDB 4.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nihaar75858/Cool-Reads.git
   cd Cool-Reads
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the backend directory:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/coolreads

   # Server
   PORT=5000
   NODE_ENV=development

   # Authentication
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRE=7d

   # File Upload
   MAX_FILE_SIZE=10485760
   FILE_UPLOAD_PATH=./uploads
   ```

5. **Start MongoDB**

   ```bash
   # Using MongoDB service
   sudo systemctl start mongodb

   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

6. **Run the Application**

   **Backend (Terminal 1):**

   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

   **Frontend (Terminal 2):**

   ```bash
   cd frontend
   npm start
   # App opens at http://localhost:3000
   ```

## 📁 Project Structure

```
Cool-Reads/
├── frontend/
│   ├── public/
│   │   ├── aboutbg.jpg
│   │   ├── dash.png
│   │   ├── logo.png
│   │   ├── navlogo.png
│   │   ├── index.html
│   │   └── favicon.ico
|   |   ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Blog/
│   │   │   │   ├── CreateBlog/
│   │   │   │   |   └── CreateBlog.jsx
│   │   │   │   ├── ViewBlog/
│   │   │   │   |   ├── BlogDetail.jsx
│   │   │   │   |   └── ViewBlog.jsx
│   │   │   ├── Config/
│   │   │   |   └── config.jsx
│   │   │   ├── constants/
│   │   │   |   └── utils.jsx
│   │   │   ├── Context/
│   │   │   |   └── UserContext.jsx
│   │   │   ├── Genres/
│   │   │   |   └── Genres.jsx
│   │   │   ├── HelpCenter/
│   │   │   |   └── HelpCenter.jsx
│   │   │   ├── Navbar/
│   │   │   |   └── Navbar.jsx
│   │   │   ├── NotFound/
│   │   │   |   └── NotFound.jsx
│   │   │   ├── Profile/
│   │   │   |   └── Profile.jsx
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboard/
│   │   │   │   |   └── AdminDashboard.jsx
│   │   │   │   ├── AdminNotification/
│   │   │   │   |   └── AdminNotification.jsx
│   │   │   │   ├── Publishing/
│   │   │   │   |   ├── BookRequestDetail.jsx
│   │   │   │   |   ├── ModifyPublications.jsx
│   │   │   │   |   ├── ReviewPublications.jsx
│   │   │   │   |   └── ViewPublications.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Author/
│   │   │   │   ├── AuthorDashboard/
│   │   │   │   |   └── AuthorDashboard.jsx
│   │   │   │   ├── AddBook/
│   │   │   │   |   └── AddBook.jsx
│   │   │   │   ├── AuthorNotification/
│   │   │   │   |   └── AuthorNotification.jsx
│   │   │   ├── Public/
│   │   │   │   ├── PublicDashboard/
│   │   │   │   |   └── PublicDashboard.jsx
│   │   │   │   ├── About/
│   │   │   │   |   └── About.jsx
│   │   │   │   ├── PubBlog/
│   │   │   │   |   └── PubBlog.jsx
│   │   │   │   ├── PubBooks/
│   │   │   │   |   └── PubBooks.jsx
│   │   │   ├── Viewer/
│   │   │   │   ├── ViewerDashboard/
│   │   │   │   |   └── ViewerDashboard.jsx
│   │   │   │   ├── ViewBooks/
│   │   │   │   |   └── ViewBook.jsx
│   │   │   │   ├── ViewerNotifications/
│   │   │   │   |   └── ViewerNotification.jsx
│   │   ├── App.js
│   │   └── index.js
|   |   ...
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── models/
│   │   ├── Users.js
│   │   ├── Register.js
│   │   ├── Book.js
│   │   ├── BookRequest.js
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   ├── Notification.js
│   │   ├── Publication.js
│   │   └── Help.js
|   ├── routes/
|   |   ├── Admin/
|   |   │   ├── adminRoutes.js
|   |   │   └── publicationRoutes.js
|   ├── Auth/
|   │   ├── userRoutes.js
|   │   └── validate.js
|   ├── Author/
|   │   └── bookRequestRoutes.js
|   ├── Blog/
|   │   └── blogRoutes.js
|   ├── Comments/
│   |   └── commentRoutes.js
|   ├── Help/
|   │   └── helpcenter.js
|   ├── Notification/
│   |   └── notification.js
|   ├── Public/
│   |   └── publicroutes.js
|   └── Viewer/
│   │   └── viewerRoutes
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   └── upload.js
│   ├── controllers/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── uploads/
├── .gitignore
└── README.md
```

## 🔐 User Roles & Permissions

### 👨‍💼 Admin

| Feature      | Create | Read | Update | Delete |
| ------------ | ------ | ---- | ------ | ------ |
| Books        | ✅     | ✅   | ✅     | ✅     |
| Users        | ✅     | ✅   | ✅     | ✅     |
| Blogs        | ✅     | ✅   | ✅     | ✅     |
| Requests     | ❌     | ✅   | ✅     | ✅     |
| Help Requests| ❌     | ✅   | ✅     | ✅     |

### ✍️ Author

| Feature   | Create | Read | Update | Delete |
| --------- | ------ | ---- | ------ | ------ |
| Own Books | ✅     | ✅   | ✅     | ✅     |
| All Books | ❌     | ✅   | ❌     | ❌     |
| Own Blogs | ✅     | ✅   | ✅     | ✅     |
| Requests  | ✅     | ✅   | ❌     | ❌     |
| Comments  | ✅     | ✅   | ✅     | ✅     |

### 👀 Viewer

| Feature      | Create | Read | Update | Delete |
| ------------ | ------ | ---- | ------ | ------ |
| Books        | ❌     | ✅   | ❌     | ❌     |
| Blogs        | ❌     | ✅   | ❌     | ❌     |
| Comments     | ✅     | ✅   | ✅     | ✅     |
| Help Tickets | ✅     | ✅   | ❌     | ❌     |

### 🕵️ Anonymous User

- ✅ Browse public books
- ✅ Read blogs
- ✅ Submit help requests
- ❌ Leave comments (requires login)

## 🛠️ Technology Stack

### Frontend

- **React.js** - UI library for building interactive interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Additional Libraries

- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **body-parser** - Request body parsing
- **method-override** - HTTP method override
- **multer** - File upload handling
- **multer-gridfs-storage** - GridFS storage for large files

## 📊 Database Schema

### User Model

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  role: String (enum: ['admin', 'author', 'viewer']),
  profilePicture: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Book Model

```javascript
{
  title: String (required),
  author: ObjectId (ref: 'User'),
  description: String,
  coverImage: String,
  file: String,
  genre: [String],
  publishedDate: Date,
  status: String (enum: ['draft', 'pending', 'published', 'rejected']),
  views: Number,
  downloads: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model

```javascript
{
  title: String (required),
  author: ObjectId (ref: 'User'),
  content: String (required),
  coverImage: String,
  tags: [String],
  published: Boolean,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model

```javascript
{
  user: ObjectId (ref: 'User'),
  targetType: String (enum: ['book', 'blog']),
  targetId: ObjectId,
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Request Model

```javascript
{
  author: ObjectId (ref: 'User'),
  book: ObjectId (ref: 'Book'),
  type: String (enum: ['publication', 'edit', 'removal']),
  status: String (enum: ['pending', 'approved', 'rejected']),
  message: String,
  adminResponse: String,
  createdAt: Date,
  updatedAt: Date
}
```

### HelpTicket Model

```javascript
{
  user: ObjectId (ref: 'User', optional for anonymous),
  email: String,
  subject: String (required),
  message: String (required),
  status: String (enum: ['open', 'in-progress', 'resolved', 'closed']),
  responses: [{
    admin: ObjectId (ref: 'User'),
    message: String,
    timestamp: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Key Workflows

### Book Publication Flow

```
Author Submits Book
        ↓
Request Created (Status: Pending)
        ↓
Admin Reviews Request
        ↓
    ┌───┴───┐
Approve    Reject
    ↓         ↓
Published  Rejected
    ↓         ↓
Notify     Notify
Author     Author
```

### Help Center Flow

```
User/Anonymous Submits Query
        ↓
Ticket Created (Status: Open)
        ↓
Admin Views Ticket
        ↓
Admin Responds
        ↓
Status: In Progress
        ↓
Issue Resolved
        ↓
Status: Resolved/Closed
        ↓
User Notified
```

## 🎨 UI Components

### Dashboard Examples

**Admin Dashboard:**

- Total Users, Books, Requests overview
- Recent activity feed
- Pending requests table
- Quick actions panel

**Author Dashboard:**

- My Books gallery
- Request status tracker
- Blog management
- Upload new book button

**Viewer Dashboard:**

- Recommended books
- Continue reading section
- Recently added books
- Trending blogs

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access Control**: Middleware-enforced permissions
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Type and size restrictions
- **CORS Configuration**: Controlled cross-origin requests
- **SQL Injection Prevention**: Mongoose ODM protection
- **XSS Protection**: Content sanitization

## 🧪 API Endpoints

### Authentication

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/:userId       - Get current user
PUT    /api/auth/updateprofile - Update user profile
```

### Books

```
GET    /api/books              - Get all published books
GET    /api/books/:id          - Get book by ID
POST   /api/books              - Create new book (Author)
PUT    /api/books/:id          - Update book (Author/Admin)
DELETE /api/books/:id          - Delete book (Admin)
GET    /api/books/author/:id   - Get books by author
```

### Blogs

```
GET    /api/blogs              - Get all blogs
GET    /api/blogs/:id          - Get blog by ID
POST   /api/blogs              - Create blog (Author/Admin)
PUT    /api/blogs/:id          - Update blog (Author/Admin)
DELETE /api/blogs/:id          - Delete blog (Author/Admin)
```

### Requests

```
GET    /api/requests           - Get all requests (Admin)
GET    /api/requests/my        - Get my requests (Author)
POST   /api/requests           - Create new request (Author)
PUT    /api/requests/:id       - Update request status (Admin)
DELETE /api/requests/:id       - Delete request (Admin)
```

### Help Center

```
GET    /api/help               - Get all tickets (Admin)
GET    /api/help/:id           - Get ticket by ID
POST   /api/help               - Create help ticket
PUT    /api/help/:id           - Respond to ticket (Admin)
DELETE /api/help/:id           - Delete ticket (Admin)
```

### Comments

```
GET    /api/comments/:type/:id - Get comments for blog
POST   /api/comments/:blogId   - Create comment for blog
PUT    /api/comments/:id       - Update comment
DELETE /api/comments/:id       - Delete comment
```

## 📈 Future Enhancements

- [ ] **Real-time Notifications**: WebSocket integration for instant updates
- [ ] **Advanced Search**: Full-text search with filters and sorting
- [ ] **Reading Progress Tracker**: Save reading position and track progress
- [ ] **Social Features**: Follow authors, like/share functionality
- [ ] **Rating System**: 5-star ratings for books
- [ ] **Book Recommendations**: AI-powered personalized suggestions
- [ ] **Mobile App**: React Native mobile application
- [ ] **E-book Reader**: Built-in PDF/EPUB reader
- [ ] **Analytics Dashboard**: Detailed insights for authors
- [ ] **Multi-language Support**: i18n internationalization
- [ ] **Dark Mode**: Theme customization
- [ ] **Email Notifications**: Automated email alerts

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**

```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Restart MongoDB
sudo systemctl restart mongodb
```

**Port Already in Use**

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

**File Upload Issues**

- Check `uploads/` directory exists and has write permissions
- Verify `MAX_FILE_SIZE` in `.env`
- Ensure multer middleware is properly configured

**CORS Errors**

- Add frontend URL to CORS whitelist in backend
- Check `Access-Control-Allow-Origin` headers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Nihaar** - [Nihaar75858](https://github.com/Nihaar75858)

## 🙏 Acknowledgments

- Create React App for the React boilerplate
- MongoDB documentation for database guidance
- Tailwind CSS for the beautiful styling framework
- The open-source community for inspiration

## 📞 Contact & Support

- **GitHub Issues**: [Report a bug](https://github.com/Nihaar75858/Cool-Reads/issues)
- **Email**: nihaargade@gmail.com
- **Project Link**: [https://github.com/Nihaar75858/Cool-Reads](https://github.com/Nihaar75858/Cool-Reads)

---

**Built with ❤️ using React, Node.js, and MongoDB**

_A place to Create, Share, and Socialize around books!_
