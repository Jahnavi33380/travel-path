// import React from 'react';
import PlaceCard from './PlaceCard';

function Itinerary({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Your Itinerary</h2>
    <div className='mt-5'>
      {/* Ensure days are displayed in correct sequence */}
      {trip?.tripData?.itinerary && 
        Object.keys(trip.tripData.itinerary)
          .sort((a, b) => {
            const numA = parseInt(a.replace('day', ''), 10);
            const numB = parseInt(b.replace('day', ''), 10);
            return numA - numB;
          })
          .map((dayKey) => {
            const day = trip.tripData.itinerary[dayKey];
            return (
              <div key={dayKey}>
                <h2 className='font-bold text-lg'>{dayKey}</h2>
                <div className='grid grid-cols-2 gap-5'>
                  {/* Map over the plan for this specific day */}
                  {day?.plan?.map((item, index) => (
                    <div key={index} className="mb-4 my-3">
                      {/* Pass the item details to PlaceCard */}
                      <PlaceCard 
                        placeName={item.placeName}
                        placeDetails={item.placeDetails}
                        timeToVisit={item.timeToVisit}
                        rating={item.rating}
                        place={item}  // You can pass the whole item if needed
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
    </div>
    </div>
  );
}

export default Itinerary;
