import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function AdditionalDetailsDialog({ isOpen, onClose, onSubmit }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Please provide a few details to enhance your travel experience
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="age"
              className="text-sm font-semibold text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Enter your age"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="gender"
              className="text-sm font-semibold text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-end">
          <Button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit({ age, gender })}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Save Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [openDialog, setOpenDialog] = useState(false);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const handleSignInClick = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleCloseAdditionalDetails = () => {
    setShowAdditionalDetails(false);
  };


  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp),
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      const userData = resp.data;

      const existingUser = JSON.parse(localStorage.getItem('user'));

      console.log("User Data is", userData)
      console.log("Existing User", existingUser)
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if(localStorage.getItem("user") == null) {
        console.log("User Deatils missing");
        setOpenDialog(true);
      } else {
        console.log("User Deatils present");
        setOpenDialog(false);
      }

      if(localStorage.getItem("user").gender == null || localStorage.getItem("user").age == null) {
        console.log("User Gender missing");
        setShowAdditionalDetails(true);
      } else {
        setShowAdditionalDetails(false);
      }
    })
  }

  const handleAdditionalDetails = (details) => {
    const updatedUser = { ...user, ...details };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowAdditionalDetails(false);
    setOpenDialog(false);
  };

  return (
    <div className='p-3 w-screen shadow-sm flex justify-between items-center px-5 bg-white'>
      <a href="/" className='flex items-center'>
        <img src="./logo.svg" alt="Logo" />
      </a>
      <div className='justify-end'>
        {user ?
          <div>
            <Popover>
              <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full' /></PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2></PopoverContent>
            </Popover>
          </div>
          :
          <Button className='px-4 py-2 text-sm' onClick={()=>setOpenDialog(true)}> Sign In</Button>
        }

       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
         <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
             <DialogDescription>
               <img src="/logo.svg" alt="Logo" />
               <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
               <p>Sign In to Travel Path using Google Authentication</p>

               <Button
                 onClick={login}
                 className='w-full mt-5 flex gap-4 items-center'>
                 <FcGoogle className='h-7 w-7' />
                 Sign In with Google
               </Button>
             </DialogDescription>
           </DialogHeader>
         </DialogContent>
       </Dialog>

        <AdditionalDetailsDialog
          isOpen={showAdditionalDetails}
          onClose={handleCloseAdditionalDetails}
          onSubmit={handleAdditionalDetails}
        />
      </div>
    </div>
  );
}

export default Header;