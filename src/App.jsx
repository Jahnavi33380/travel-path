import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'
import Header from './components/custom/Header';


function App() {
  const [count, setCount] = useState(0)
  const [userDetails, setUserDetails] = useState(null);


  const handleLogin = (user) => {
      setUserDetails(user);
    };

        const [showEditPreferences, setShowEditPreferences] = useState(false);

        const handleEditPreferences = () => {
          setShowEditPreferences(true);
        };

  return (
    <>

     <Header
            userDetails={userDetails}
            onEditPreferences={handleEditPreferences}
          />

      <Hero userDetails={userDetails} onLogin={handleLogin} />
       {showEditPreferences && (
              <EditPreferences

                userDetails={userDetails}
              />
            )}
    </>
  )
}

export default App
