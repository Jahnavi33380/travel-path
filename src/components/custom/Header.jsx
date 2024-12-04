import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import EditPreferences from '../LoginSignupPage/EditPreferences';
import './Header.css';
import { Link,useNavigate } from 'react-router-dom'

function Header({ userDetails, onEditPreferences, setLoggedIn }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editPreferences, setEditPreferences] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
   const navigate = useNavigate();

  useEffect(() => {
    console.log("user",user);
  }, []);
  useEffect(() => {
    if (userDetails?.email) {
      const avatarStyle = 'pixel-art';
      const seed = userDetails.email;
      setAvatarUrl(`https://api.dicebear.com/9.x/avataars/svg?seed=${seed}`);
    }
  }, [userDetails]);

    const handleEditPreferences = () => {
      setEditPreferences(true);
    };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getAvatarUrl = () => {
  console.log(userDetails?.email,"email");
  console.log(avatarUrl,"avataars")
  if (avatarUrl && avatarLoadError) {
      return avatarUrl;
    }
    return './fallbackImage.png';
  };

  const handleAvatarError = (e) => {
    console.error("Error loading avatar",e.target.src);
    setAvatarLoadError(true);
  };
   const handleLogout = () => {
     localStorage.removeItem('user');
     setLoggedIn(false);
     navigate("/");
   };


  return (
      <div className='p-3 w-screen shadow-sm flex justify-between items-center px-5 bg-white relative'>
        <a href="/" className='flex items-center'>
          <img src="./logo.svg" alt="Logo" />
        </a>

        <div className="navbar-user relative">

          <div
            className={`avatar-container ${dropdownOpen ? 'dropdown-open' : ''}`}
            onClick={toggleDropdown}
          >
            <img
              key={userDetails?.email || 'guest'}
              src={getAvatarUrl()}
              alt="User Avatar"
              className="user-avatar"
              onError={handleAvatarError}
            />
             <span className="text-center">{userDetails?.name || 'Guest'}</span>
            {dropdownOpen && (
              <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={() => navigate('/edit-preferences', { state: { userDetails } })}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Edit Preferences</button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {!userDetails && (
         <Link to={'/login-signup'}>
                                                    <Button>Log In / Sign Up</Button>
                                                  </Link>
        )}
      </div>
    );
  }
  export default Header;