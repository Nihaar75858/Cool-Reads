// src/components/Context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("Guest");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId || userId === "undefined" || userId === null) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.role) {
          setUser(storedUser);
          setUserType(storedUser.role);
        } else {
          setUserType("Guest");
        }
        return; // Exit early
      }

      try {
        const res = await fetch(`http://localhost:5000/api/userdata/${userId}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        console.log("User data fetched from backend:", data);
        setUser(data);
        setUserType(data.role);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching user from backend:", error);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.role) {
          setUser(storedUser);
          setUserType(storedUser.role);
        } else {
          setUserType("Guest");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, userType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
