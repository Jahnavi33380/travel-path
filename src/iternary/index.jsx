import { useState, useEffect } from 'react';
import './iternary.css';
import PlaceCardItem from '@/view-trip/components/PlaceCardItem';

export default function CreateIternary() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
        // Fetch preferences from localStorage
        const storedFood = JSON.parse(localStorage.getItem('selectedFood')) || [];
        const storedInterests = JSON.parse(localStorage.getItem('selectedInterests')) || [];
        setSelectedFood(storedFood);
        setSelectedInterests(storedInterests);

        const iternarySocket = new WebSocket('ws://82.197.93.235:8000/ws/itinerary');
        const cord = JSON.parse(localStorage.getItem("cord"));
        iternarySocket.onopen = () => {
            console.log('WebSocket connected');
            const requestData = {
                max_distance: 70000,
                rating_threshold: 4.5,
                restaurant_type: storedFood,  // Use stored preferences
                interests: storedInterests,   // Use stored preferences
                result_limit: 5,
                latitude: cord.lat || 33.4230, 
                longitude: cord.lng || -111.9278
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

    return (
        <div className="create-iternary-container">
            <div className="create-iternary-form">
                <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
                    <h2 className="font-bold text-3xl">Let's Go... 🧳</h2>
                    <p className="mt-3 text-gray-500 text-xl">Generating Itinerary... </p>

                    {/* Grid layout for the place cards */}
                    <div className="itinerary-cards-container mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {messages.map((message) => (
                            message.Restaurant ? (
                                <PlaceCardItem
                                    key={message.name}
                                    name={message.name}
                                    Address={message.Address}
                                    distance={message.distance.toFixed(2)}
                                    rating={message.rating}
                                    TIME_NOW={message.TIME_NOW}
                                    Type={message.Type}
                                />
                            ) : (
                                <PlaceCardItem
                                    key={message.name}
                                    name={message.name}
                                    distance={message.distance}
                                    TIME_NOW={message.TIME_NOW}
                                    Type={message.type}
                                />
                            )
                        ))}
                    </div>

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
