import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import CreateTrip from './create-trip'; // Adjust the path if necessary
import Header from './components/custom/Header';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


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
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <RouterProvider  router={router} />
    </GoogleOAuthProvider>;
  </React.StrictMode>,
);

