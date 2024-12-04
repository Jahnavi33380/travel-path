import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PHOTO_REFERENCE_URL } from '@/service/GlobalApi'
import { GetPlaceDetails } from '@/service/GlobalApi';


function PlaceCardItem({ name, Type, Address, rating, distance, TIME_NOW }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        GetPlacePhoto();
    }, [])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl = PHOTO_REFERENCE_URL.replace('{NAME}', resp.data.places[0].photos[3].name);

            setPhotoUrl(PhotoUrl);

        })
    }
    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=centurylink+field+${encodeURIComponent(name)},${encodeURIComponent(Address)}`}
            target='_blank'
        >
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl ? photoUrl : "/placeholder.jpg"} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2 flex flex-col gap-2'>
                    {name && <h3 className="card-title">🍕 {name}</h3>}
                    {Type && <p className="card-type">🍽️ {Type}</p>}
                    {Address && <p className="card-address">📍 {Address}</p>}
                    {rating && <p className="card-rating">⭐ Rating: {rating}</p>}
                    {distance !== undefined && <p className="card-distance">📏 Distance: {distance} meters</p>}
                    {TIME_NOW && <p className="card-time-now">🕒 Time Now: {TIME_NOW}</p>}
                </div>
            </div>
        </Link>

    )
}

export default PlaceCardItem