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



function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDailog] = useState(false);


  useEffect(() => {
    console.log(user)
  }, [])

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
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload();
  })
}
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
          <Button className='px-4 py-2 text-sm' onClick={()=>setOpenDailog(true)}> Sign In</Button>
        }

        <Dialog open={openDailog}>
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
      </div>
    </div>
  )
}

export default Header



// bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-10 rounded-lg