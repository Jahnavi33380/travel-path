import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import CreateTrip from './create-trip'; // Adjust the path if necessary
import LoginSignupPage from './components/LoginSignupPage/LoginSignupPage'
import Header from './components/custom/Header';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditPreferences from './components/LoginSignupPage/EditPreferences'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>,
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>,
  },
   {
      path:'/login-signup',
      element:<LoginSignupPage/>,
    },
    {
     path:'/edit-preferences',
          element:<EditPreferences/>,
    }


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>

    <RouterProvider  router={router} />
    </GoogleOAuthProvider>;
  </React.StrictMode>,
);

