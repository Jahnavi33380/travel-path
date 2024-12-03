import { GetPlaceDetails } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { PHOTO_REFERENCE_URL } from '@/service/GlobalApi';

function InfoSect({trip}) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl=PHOTO_REFERENCE_URL.replace('{NAME}', resp.data.places[0].photos[3].name );

            setPhotoUrl(PhotoUrl); 

        })
    }
  return (
    <div>
        <img src={ photoUrl?photoUrl:"/placeholder.jpg"} className= 'h-[340px] w-full object-cover rounded-3xl' />

        <div className=' my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip.userSelection?.noOfDays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🍻 Number of people : {trip.userSelection?.noOfPeople} </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🚙 Mode of transport : {trip.userSelection?.transport}</h2>

            </div>
        </div>
    </div>
  )
}

export default InfoSect