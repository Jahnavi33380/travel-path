import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSect from '../components/InfoSect';
import Hotels from '../components/Hotels';
import Itinerary from '../components/Itinerary';
import Footer from '../components/Footer';

function ViewTrip() {
  const {tripId}= useParams();
  const [trip, setTrip] = useState([]);

  useEffect(()=>{
    tripId&&GetTripData();
  }, [tripId])

  const GetTripData=async()=>{
    const docRef= doc( db, 'Trips', tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:", docSnap.data())
      setTrip(docSnap.data());
    }
    else{
      console.log("No such Document");
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl-px-56 max-w-7xl mx-auto'>
      {/* Info Section */}
          <InfoSect trip={trip} />

      {/* Recommended Hotels */}
          <Hotels trip={trip} />

      {/* Itinerary */}
          <Itinerary trip={trip} />

       {/* Footer */}
          <Footer trip={trip} />

    </div>
  )
}

export default ViewTrip