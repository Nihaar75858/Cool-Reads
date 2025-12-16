import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./AuthContext";
import { API_BASE } from "../Config/config";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/userdata/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    };

    fetchProfile();
  }, [user?.id]);

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
