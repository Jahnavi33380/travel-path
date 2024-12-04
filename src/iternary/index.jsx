import { useState, useEffect } from 'react';
import './iternary.css';
import { io } from 'socket.io-client';
import PlaceCardItem from '@/view-trip/components/PlaceCardItem';

export default function CreateIternary() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const iternarySocket = new WebSocket('ws://localhost:8000/ws/itinerary');

        iternarySocket.onopen = () => {
            console.log('WebSocket connected');
            const requestData = {
                max_distance: 50000,
                rating_threshold: 4.5,
                restaurant_type: ["Italian", "Chinese"],
                interests: ["Museum", "Park", "Church", "Summit"],
                result_limit: 5,
                latitude: 33.4092,
                longitude: -111.9237
            };
            iternarySocket.send(JSON.stringify(requestData));
        };

        iternarySocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data]);
            } catch (error) {
                console.log(error);
            }
        };

        iternarySocket.onclose = () => {
            console.log('WebSocket closed');
            setIsLoading(false);
        };

        return () => {
            if (iternarySocket) {
                iternarySocket.close();
            }
        };
    }, []);

    // Function to render type 1 card
    const renderType1Card = (message) => {
        return (
            <div className="itinerary-card" key={message.Restaurant}>
                <h3 className="card-title">🍕 {message.name}</h3>
                <p className="card-type">🍽️ {message.Type}</p>
                <p className="card-address">📍 {message.Address}</p>
                <p className="card-rating">⭐ Rating: {message.rating}</p>
                <p className="card-distance">📏 Distance: {message.distance.toFixed(2)} meters</p>
                <p className="card-time-now">🕒 Time Now: {message.TIME_NOW}</p>
            </div>
        );
    };

    // Function to render type 2 card
    const renderType2Card = (message) => {
        return (
            <div className="itinerary-card" key={message.place}>
                <h3 className="card-title">🏞️ {message.name}</h3>
                <p className="card-type">📌 {message.type}</p>
                <p className="card-distance">📏 Distance: {message.distance} meters</p>
                <p className="card-time-now">🕒 Time Now: {message.TIME_NOW}</p>
                <p className="card-travel-time">🗺️ Time to Reach: {message.TimeToReachDestination.toFixed(2)} minutes</p>
            </div>
        );
    };

    return (
        <div className="create-iternary-container">
            <div className="create-iternary-form">
                <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
                    <h2 className="font-bold text-3xl">Let's Go... 🧳</h2>
                    <p className="mt-3 text-gray-500 text-xl">Generating Itinerary... </p>

                    <div className="itinerary-cards-container mt-6">
                        {messages.map((message) => (

                            message.Restaurant ? (
                                <PlaceCardItem
                                    name={message.name}
                                    Address={message.Address}
                                    distance={message.distance.toFixed(2)}
                                    rating={message.rating}
                                    TIME_NOW={message.TIME_NOW}
                                    Type={message.Type}
                                />
                            ) : renderType2Card(message)

                        ))}


                    </div>

                    {/* Loading Icon */}
                    {isLoading && (
                        <div className="loading-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="animate-spin h-8 w-8 text-blue-500 mx-auto mt-4"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            <p>Loading more results...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
