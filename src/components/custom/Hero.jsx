import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero({userDetails}) {
  return (

    <div className='flex flex-col items-center mx-56 gap-9 mt-20'>
        <h1 className='font-extrabold text-[60px] text-center mt-16'>
            <span className='text-[rgb(255,122,0)]'>Discover your new Adventure with Travel Path 🛫</span> <br /> Your Itinerary Planner</h1>
            <p className='text-xl text-gray-500 text-center'> Your Personalized Travel Planner by Team 11</p>
           <Link to={'/create-trip'}>
           {userDetails ? (
                                         <p className="text-xl text-green-500 text-center">
                                           Welcome, {userDetails.name || 'User'}!
                                         </p>
                                       ) : (
                                         <Link to={'/login-signup'}>
                                           <Button>Log In / Sign Up</Button>
                                         </Link>
                                       )}
                                       <br/>
                                       <br/>
           <Button className="text-center"> Get Started! It's Free</Button>
           </Link>

            <br />
            <br />
            <br />

           <p className='text-sm text-gray-500 text-center'>©️ Ashutosh - Rajesh - Aditya - Girish - Jahnavi </p>
    </div>
  )
}

export default Hero

