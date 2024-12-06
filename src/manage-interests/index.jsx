import { useState, useEffect } from 'react';
import './interest.css';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ManageInterests() {
    const navigate = useNavigate();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const defaultFoodRestrictions = [
        { name: 'Vegan', image: '🌱' },
        { name: 'Gluten Free', image: '🚫🌾' },
        { name: 'Halal', image: '🕌' },
        { name: 'Vegetarian', image: '🥦' },
        { name: 'Kosher', image: '✡️' },
    ];

    const defaultCuisines = [
        { name: 'Indian', image: '🍛' },
        { name: 'Mexican', image: '🌮' },
        { name: 'Italian', image: '🍝' },
        { name: 'Chinese', image: '🥡' },
        { name: 'Asian', image: '🍜' },
        { name: 'Japanese', image: '🍣' },
        { name: 'French', image: '🥖' },
        { name: 'Ethiopian', image: '🍲' },
    ];

    const defaultTypes = [
        { name: 'Breakfast', image: '🍳' },
        { name: 'Brunch', image: '🥞' },
        { name: 'Nightlife', image: '🎶' },
        { name: 'Lunch', image: '🥗' },
        { name: 'Dinner', image: '🍽️' },
        { name: 'Wine & Spirits', image: '🍷' },
        { name: 'Arts & Entertainment', image: '🎭' },
        { name: 'Local Flavor', image: '🗺️' },
        { name: 'Gastropubs', image: '🍔' },
        { name: 'Sports Bars', image: '🏈' },
        { name: 'Cocktail Bars', image: '🍹' },
    ];

    const interestCategories = {
        'Art & History': [
            { name: 'Museums', image: '🏛️' },
            { name: 'Art Galleries', image: '🖼️' },
            { name: 'Monuments', image: '🗽' },
            { name: 'Church', image: '⛪' },
        ],
        Nature: [
            { name: 'Lakes', image: '🏞️' },
            { name: 'Beaches', image: '🏖️' },
            { name: 'Valley', image: '🏔️' },
            { name: 'National Parks', image: '🌲' },
            { name: 'Island', image: '🏝️' },
            { name: 'Zoo', image: '🦁' },
        ],
        'Sports & Outdoors': [
            { name: 'Stadium', image: '🏟️' },
            { name: 'Parks', image: '🌳' },
            { name: 'Skiing', image: '⛷️' },
            { name: 'Trekking', image: '🥾' },
            { name: 'Hiking', image: '🚶‍♂️' },
        ],
    };

    // Load preferences from localStorage on component mount
    useEffect(() => {
        const storedFood = JSON.parse(localStorage.getItem('selectedFood')) || [];
        const storedInterests = JSON.parse(localStorage.getItem('selectedInterests')) || [];
        const storedTypes = JSON.parse(localStorage.getItem('selectedTypes')) || [];

        setSelectedFood(storedFood);
        setSelectedInterests(storedInterests);
        setSelectedTypes(storedTypes);
    }, []);

    const handleSelection = (category, setCategory, item) => {
        setCategory((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item) // Remove if already selected
                : [...prev, item] // Add if not selected
        );
    };

    const handleProceed = () => {
        localStorage.setItem('selectedFood', JSON.stringify(selectedFood));
        localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
        localStorage.setItem('selectedTypes', JSON.stringify(selectedTypes));
        navigate('/iternary');
    };

    const Chip = ({ label, selected, onClick }) => (
        <button
            onClick={onClick}
            style={{
                margin: '5px',
                padding: '5px 10px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selected ? '#FF7A00' : '#f0f0f0',
                color: selected ? 'white' : 'black',
                cursor: 'pointer',
            }}
        >
            {label}
        </button>
    );

    return (
        <div className="create-iternary-container">
            <div className="create-iternary-form">
                <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
                    <h2 className="font-bold text-3xl">Pack your bag</h2>
                    <p className="mt-3 text-gray-500 text-xl">Tell us more about you...</p>
                    <hr />
                    <h4 className="mt-3"><b><ul>Food Restrictions</ul></b></h4>
                    {defaultFoodRestrictions.map((restriction, index) => (
                        <Chip
                            key={index}
                            label={restriction.image + " " + restriction.name}
                            selected={selectedFood.includes(restriction.name)}
                            onClick={() => handleSelection(selectedFood, setSelectedFood, restriction.name)}
                        />
                    ))}
                    <h2 className="mt-3"><b>Cuisines</b></h2>
                    {defaultCuisines.map((cuisine, index) => (
                        <Chip
                            key={index}
                            label={cuisine.image + " " + cuisine.name}
                            selected={selectedFood.includes(cuisine.name)}
                            onClick={() => handleSelection(selectedFood, setSelectedFood, cuisine.name)}
                        />
                    ))}
                    <h2 className="mt-3"><b>Type</b></h2>
                    {defaultTypes.map((type, index) => (
                        <Chip
                            key={index}
                            label={type.image + " " + type.name}
                            selected={selectedTypes.includes(type.name)}
                            onClick={() => handleSelection(selectedTypes, setSelectedTypes, type.name)}
                        />
                    ))}

                    <h2 className="mt-3"><b> <ul>Interest Categories</ul></b></h2>
                    {Object.entries(interestCategories).map(([category, items]) => (
                        <div key={category}>
                            <h5 className="mt-3"><b>{category}</b></h5>
                            {items.map((item, index) => (
                                <Chip
                                    key={index}
                                    label={item.image + " " + item.name}
                                    selected={selectedInterests.includes(item.name)}
                                    onClick={() => handleSelection(selectedInterests, setSelectedInterests, item.name)}
                                />
                            ))}
                        </div>
                    ))}

                    <div className="savebutton mt-3">
                        <Button component={Link} className='px-4 py-2 text-sm' onClick={handleProceed}>
                            Proceed
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
