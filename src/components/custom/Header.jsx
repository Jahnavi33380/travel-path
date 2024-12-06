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
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function AdditionalDetailsDialog({ isOpen, onClose, onSubmit }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Additional Information</DialogTitle>
          <DialogDescription>
            Please provide your age and gender to complete your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Button onClick={() => onSubmit({ age, gender })}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [openDialog, setOpenDialog] = useState(false);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [user])

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

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="Logo" />
                <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                <p>Sign In to Travel Path using Google Authentication</p>

                <Button
                  onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                  <FcGoogle className='h-7 w-7' />
                  Sign In with Google
                </Button>

              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <AdditionalDetailsDialog
          isOpen={showAdditionalDetails}
          onClose={() => setShowAdditionalDetails(false)}
          onSubmit={handleAdditionalDetails}
        />
      </div>
    </div>
  )
}

export default Header