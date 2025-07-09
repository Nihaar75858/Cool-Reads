import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/DashBoard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Notifications from './components/Notifications/Notifications';
import About from './pages/About/About';
import PubBlogs from './pages/Public/PubBlog/PubBlogs';
import PubBooks from './pages/Public/PubBooks/PubBooks';


// Blog
import CreateBlog from './pages/Blog/CreateBlog/CreateBlog';
import ViewBlogs from './pages/Blog/ViewBlog/ViewBlog';
import BlogDetail from './pages/Blog/ViewBlog/BlogDetail';


// Author
import AuthorDashboard from './pages/DashBoard/AuthorDashboard';
import AddPublication from './pages/Admin/Publishing/AddPublication';
import AddBook from './pages/Author/AddBook/AddBook';
import AuthorNotifications from './pages/Author/Notifications/AuthorNotifications';

// Admin
import AdminNotification from './pages/Admin/Notification/AdminNotifications';
import AdminDashboard from './pages/DashBoard/AdminDashboard';
import BookRequestDetail from './pages/Admin/Notification/BookRequestDetail';

// Viewer
import ViewerDashboard from './pages/DashBoard/ViewerDashboard';
import ViewBook from './pages/Viewer/ViewBooks/ViewBook';

function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const location = useLocation();


  // List of paths where Navbar should NOT appear
  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <main className='overflow-hidden'>
      {shouldShowNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path='/pubbooks' element={<PubBooks />} />
        <Route path="/publicblogs" element={<PubBlogs />} />
        
        {/* Dashboard */}

        // Blogs
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/viewblogs" element={<ViewBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        
        // Author
        <Route path="/author/authordashboard" element={<AuthorDashboard user={user} />} />
        <Route path="/author/addbook" element={<AddBook />} />
        <Route path="/author/notifications" element={<AuthorNotifications />} />

        // Admin
        <Route path="/admin/addpublications" element={<AddPublication user={user} />} />
        <Route path="/admin/viewpublications" element={<AdminNotification />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/requests/:id" element={<BookRequestDetail />} />
        <Route path="/admin/notifications" element={<Notifications />} />

        // Viewer
        <Route path="/viewerdashboard" element={<ViewerDashboard user={user} />} />
        <Route path="/viewbooks" element={<ViewBook />} />

        {/* Fallback route for 404 */}
      </Routes>
    </main>
  );
}

export default App;
