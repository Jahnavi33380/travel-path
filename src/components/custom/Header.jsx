import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import EditPreferences from "../LoginSignupPage/EditPreferences";
import "./Header.css";

function Header({ userDetails, setLoggedIn }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editPreferencesVisible, setEditPreferencesVisible] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails?.email) {
      const avatarStyle = "pixel-art";
      const seed = userDetails.email;
      setAvatarUrl(`https://api.dicebear.com/9.x/avataars/svg?seed=${seed}`);
    }
  }, [userDetails]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEditPreferences = () => {
    setEditPreferencesVisible(true);
  };

  const closeEditPreferences = () => {
    setEditPreferencesVisible(false);
  };

  const getAvatarUrl = () => {
    if (avatarUrl && avatarLoadError) {
      return avatarUrl;
    }
    return "./fallbackImage.png";
  };

  const handleAvatarError = (e) => {
    console.error("Error loading avatar", e.target.src);
    setAvatarLoadError(true);
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="p-3 w-screen shadow-sm flex justify-between items-center px-5 bg-white relative">
        <a href="/" className="flex items-center">
          <img src="./logo.svg" alt="Logo" />
        </a>

        <div className="navbar-user relative">
          <div
            className={`avatar-container ${dropdownOpen ? "dropdown-open" : ""}`}
            onClick={toggleDropdown}
          >
            <img
              key={userDetails?.email || "guest"}
              src={getAvatarUrl()}
              alt="User Avatar"
              className="user-avatar"
              onError={handleAvatarError}
            />
            <span className="text-center">{userDetails?.name || "Guest"}</span>
            {dropdownOpen && userDetails && (
              <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={handleEditPreferences}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Preferences
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {!userDetails && (
          <Link to={"/login-signup"}>
            <Button>Log In / Sign Up</Button>
          </Link>
        )}
      </div>

      {/* Edit Preferences Modal */}
      {editPreferencesVisible && (
         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
           <div className="bg-white p-5 rounded-md shadow-lg w-3/4 max-w-lg relative">
             <EditPreferences onClose={closeEditPreferences} />
           </div>
         </div>
       )}
    </div>
  );
}

export default Header;
