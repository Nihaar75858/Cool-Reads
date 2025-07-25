import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/DashBoard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import About from './pages/About/About';
import PubBlogs from './pages/Public/PubBlog/PubBlogs';
import PubBooks from './pages/Public/PubBooks/PubBooks';
import HelpCenter from './components/HelpCenter/HelpCenter';

// Blog
import CreateBlog from './pages/Blog/CreateBlog/CreateBlog';
import ViewBlogs from './pages/Blog/ViewBlog/ViewBlog';
import BlogDetail from './pages/Blog/ViewBlog/BlogDetail';

// Author
import AuthorDashboard from './pages/DashBoard/AuthorDashboard';
import AddBook from './pages/Author/AddBook/AddBook';
import AuthorNotifications from './pages/Author/Notifications/AuthorNotifications';

// Admin
import AdminNotification from './pages/Admin/Notification/AdminNotification';
import AdminDashboard from './pages/DashBoard/AdminDashboard';
import BookRequestDetail from './pages/Admin/Publishing/BookRequestDetail';
import ViewPublication from './pages/Admin/Publishing/ViewPublication';
import ReviewPublication from './pages/Admin/Publishing/ReviewPublication';
import ModifyPublications from './pages/Admin/Publishing/ModifyPublications';

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
        <Route path="/helpcenter" element={<HelpCenter />} />
        
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
        <Route path="/admin/viewpublications" element={<ViewPublication />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/requests/:id" element={<BookRequestDetail />} />
        <Route path="/admin/notifications" element={<AdminNotification />} />
        <Route path="/admin/reviewpublication" element={<ReviewPublication />} />
        <Route path="/admin/modifybook/:id" element={<ModifyPublications />} />

        // Viewer
        <Route path="/viewerdashboard" element={<ViewerDashboard user={user} />} />
        <Route path="/viewbooks" element={<ViewBook />} />

        {/* Fallback route for 404 */}
      </Routes>
    </main>
  );
}

export default App;
