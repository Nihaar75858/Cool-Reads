import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import PublicDashboard from "./pages/Public/PublicDashboard/PublicDashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import About from "./pages/Public/About/About";
import PubBlogs from "./pages/Public/PubBlog/PubBlogs";
import PubBooks from "./pages/Public/PubBooks/PubBooks";

// Blog
import CreateBlog from "./components/Blog/CreateBlog/CreateBlog";
import ViewBlogs from "./components/Blog/ViewBlog/ViewBlog";
import BlogDetail from "./components/Blog/ViewBlog/BlogDetail";

// Author
import AuthorDashboard from "./pages/Author/AuthorDashboard/AuthorDashboard";
import AddBook from "./pages/Author/AddBook/AddBook";
import AuthorNotifications from "./pages/Author/AuthorNotifications/AuthorNotifications";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import BookRequestDetail from "./pages/Admin/Publishing/BookRequestDetail";
import ViewPublication from "./pages/Admin/Publishing/ViewPublication";
import ReviewPublication from "./pages/Admin/Publishing/ReviewPublication";
import ModifyPublications from "./pages/Admin/Publishing/ModifyPublications";

// Viewer
import ViewerDashboard from "./pages/Viewer/ViewerDashboard/ViewerDashboard";
import ViewBook from "./pages/Viewer/ViewBooks/ViewBook";
import ViewNotifications from "./pages/Viewer/ViewNotifications/ViewNotifications";

function App() {
  const location = useLocation();

  // List of paths where Navbar should NOT appear
  const hideNavbarPaths = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <main className="overflow-hidden">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<PublicDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/pubbooks" element={<PubBooks />} />
        <Route path="/publicblogs" element={<PubBlogs />} />
        {/* Blogs */}
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/viewblogs" element={<ViewBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        {/* Author */}
        <Route path="/author/authordashboard" element={<AuthorDashboard />} />
        <Route path="/author/addbook" element={<AddBook />} />
        <Route path="/author/notifications" element={<AuthorNotifications />} />
        {/* Admin */}
        <Route path="/admin/viewpublications" element={<ViewPublication />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/requests/:id" element={<BookRequestDetail />} />
        <Route
          path="/admin/reviewpublication"
          element={<ReviewPublication />}
        />
        <Route path="/admin/modifybook/:id" element={<ModifyPublications />} />
        {/* Viewer */}
        <Route path="/viewer/viewerdashboard" element={<ViewerDashboard />} />
        <Route path="/viewer/viewbooks" element={<ViewBook />} />
        <Route
          path="/viewer/viewnotifications"
          element={<ViewNotifications />}
        />
        {/* Fallback route for 404 */}
      </Routes>
    </main>
  );
}

export default App;
