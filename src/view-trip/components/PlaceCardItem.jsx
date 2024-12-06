import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PHOTO_REFERENCE_URL } from '@/service/GlobalApi'
import { GetPlaceDetails } from '@/service/GlobalApi';


function PlaceCardItem({ name, Type, Address, rating, distance, TIME_NOW }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        const GetPlacePhoto = async () => {
            const data = {
                textQuery: name
            }
            const result = await GetPlaceDetails(data).then(resp => {
                console.log(resp.data.places[0].photos[3].name)

                const PhotoUrl = PHOTO_REFERENCE_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
                console.log("Photo URL", photoUrl);

                setPhotoUrl(PhotoUrl);
            })
        }
        GetPlacePhoto()
    }, [])


    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=centurylink+field+${encodeURIComponent(name)},${encodeURIComponent(Address)}`}
            target="_blank"
        >

            <div class="mt-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg w-full h-48 object-cover" src={photoUrl ? photoUrl : "/placeholder.jpg"} alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {Type && <p className="card-type">🌲 {Type}</p>}
                        {Address && <p className="card-address">📍 {Address}</p>}
                        {rating && <p className="card-rating">⭐ Rating: {rating}</p>}
                        {distance !== undefined && <p className="card-distance">📏 Distance: {distance} meters</p>}
                        {TIME_NOW && <p className="card-time-now">🕒 Time Now: {TIME_NOW}</p>}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem