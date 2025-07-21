import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    fetchCounts();
  }, []);


  const fetchCounts = async () => {
    try {
      const [usersRes, booksRes, blogsRes, notifications] = await Promise.all([
        axios.get(`http://localhost:5000/api/admin/users`),
        axios.get(`http://localhost:5000/api/admin/bookcount`),
        axios.get(`http://localhost:5000/api/admin/blogcount`),
        axios.get(`http://localhost:5000/api/admin/notifs`)
      ]);

      // Log responses for debugging
      console.log("Users:", usersRes.data);
      console.log("Books:", booksRes.data);
      console.log("Blogs:", blogsRes.data);
      console.log("Notifications:", notifications.data);

      setUserCount(usersRes.data.count);         // ✅ Use .count for users
      setBookCount(booksRes.data.count);        // ❗ Still using .length if books returns array
      setBlogCount(blogsRes.data.count);        // ❗ Still using .length if blogs returns array
      setNotifs(notifications.data);
    } catch (err) {
      console.error("Failed to fetch dashboard counts:", err);
    }
  };

  console.log("Users:", userCount);

  return (
    <div className="left-0 z-45 w-full">
      <div className="flex h-screen bg-custombg">

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
              <p className="text-2xl font-bold text-gray-800 mt-2">{userCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">No. of Books</h2>
              <p className="text-2xl font-bold text-gray-800 mt-2">{bookCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">No. of Blogs</h2>
              <p className="text-2xl font-bold text-gray-800 mt-2">{blogCount}</p>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left">User</th>
                  <th className="border px-4 py-2 text-left">Action</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {notifs.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="border px-4 py-2 text-center">
                      No recent activities.
                    </td>
                  </tr>
                ) : (
                  notifs.map((n) => (
                    <tr key={n._id}>
                      <td className="border px-4 py-2">{n.authorId.firstName + " " + n.authorId.lastName || 'Unknown User'}</td>
                      <td className="border px-4 py-2">{n.message}</td>
                      <td className="border px-4 py-2">
                        {new Date(n.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
