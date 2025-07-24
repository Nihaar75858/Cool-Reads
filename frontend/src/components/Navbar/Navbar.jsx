import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getNavigationConfig } from '../constants/utils'; // Adjust the path
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { useUser } from '../Context/UserContext';

const Navbar = () => {
  const { user, userType } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserType] = useState("");
  const navigate = useNavigate();

  const roleMap = {
    "Admin": 1,
    "Author": 2,
    "Viewer": 3,
    "Guest": 0
  };

  const navLinks = getNavigationConfig(roleMap[userType] ?? 0);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="p-4 shadow-md z-50 bg-logobg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl flex items-center space-x-2">
            <img src="/Navlogo.png" alt="Logo" className="w-32 h-auto" />
          </div>

          <div className="flex items-center space-x-12 text-navtext relative">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => {
                    if (!link.submenus) navigate(link.to);
                  }}
                  className="hover:bg-[#16354E] focus:outline-none px-4 py-2 rounded-md text-navtext flex items-center gap-2"
                >
                  {link.name}
                </button>

                {link.submenus && (
                  <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 z-50 min-w-[150px]">
                    {link.submenus.map((submenu, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(submenu.to)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded cursor-pointer"
                      >
                        {submenu.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            {user ? (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{user.firstName}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <img
                  src={user.profilePic || "/default-profile.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
              </>
            ) : (
              <div className="text-center w-full"></div>
            )}
          </div>

          {/* Menu Items */}
          <ul className="space-y-4 flex-1">
            {user ? (
              <>
                <li>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-800 rounded-md hover:bg-gray-300 transition">
                    <CgProfile /> Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-gray-800 rounded-md hover:bg-gray-300 transition">
                    <CgProfile /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="flex items-center gap-2 px-4 py-2 text-gray-800 rounded-md hover:bg-gray-300 transition">
                    <CgProfile /> Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/helpcenter" className="flex items-center gap-2 px-4 py-2 text-gray-800 rounded-md hover:bg-gray-300 transition">
                <IoSettings /> Help Center
              </Link>
            </li>
          </ul>

          {/* Sign Out for logged-in users only */}
          {user && (
            <div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-600 hover:underline"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-blue opacity-40 z-40"
        />
      )}
    </>
  );
};

export default Navbar;
