import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';
import './EditPreferences.css';
import { Link,useNavigate } from 'react-router-dom'

const Chip = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      margin: '5px',
      padding: '5px 10px',
      borderRadius: '20px',
      border: 'none',
      backgroundColor: selected ? '#007bff' : '#f0f0f0',
      color: selected ? 'white' : 'black',
      cursor: 'pointer',
    }}
  >
    {label}
  </button>
);

const EditPreferences = ()=>{
const navigate = useNavigate();
  const location = useLocation();
  const userDetails = location.state?.userDetails;
  const [interests, setInterests] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (userDetails && userDetails.id) {
        const db = getDatabase();
        const userRef = ref(db, `users/${userDetails.id}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setSelectedInterests(userData.interests || []);
          setSelectedFood(userData.foodPreferences || []);
        }
      }
    };

    fetchUserPreferences();
  }, [userDetails]);
  useEffect(() => {
    const fetchPreferences = async () => {
      const db = getDatabase();
      const interestsRef = ref(db, 'interests');
      const foodRef = ref(db, 'food');
      const [interestsSnapshot, foodSnapshot] = await Promise.all([
        get(interestsRef),
        get(foodRef)
      ]);

      if (interestsSnapshot.exists()) {
        setInterests(interestsSnapshot.val());
      }
      if (foodSnapshot.exists()) {
        setFoodPreferences(foodSnapshot.val());
      }
    };

    fetchPreferences();
  }, []);


const handleSave = async () => {
  if (!userDetails || !userDetails.id) {
    console.error('User details are missing');
    return;
  }

  const db = getDatabase();
  const userRef = ref(db, `users/${userDetails.id}`);

  try {
    await update(userRef, {
      interests: selectedInterests,
      foodPreferences: selectedFood,
    });

    // Update local storage with new user details
    const updatedUserDetails = {
      ...userDetails,
      interests: selectedInterests,
      foodPreferences: selectedFood,
    };
    localStorage.setItem('user', JSON.stringify(updatedUserDetails));

    // Navigate to the home page
    navigate('/');
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
};

  return (
    <div className="edit-preferences-page">
      <h2>Edit Preferences</h2>
      <div>
        <h3>Interests</h3>
        {Object.entries(interests).map(([category, items]) => (
          <div key={category}>
            <h4>{category}</h4>
            {items.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                selected={selectedInterests.includes(interest)}
                onClick={() => {
                  if (selectedInterests.includes(interest)) {
                    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
                  } else {
                    setSelectedInterests([...selectedInterests, interest]);
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <h3>Food Preferences</h3>
        {Object.entries(foodPreferences).map(([category, items]) => (
          <div key={category}>
            <h4>{category}</h4>
            {items.map((food, index) => (
              <Chip
                key={index}
                label={food}
                selected={selectedFood.includes(food)}
                onClick={() => {
                  if (selectedFood.includes(food)) {
                    setSelectedFood(selectedFood.filter((f) => f !== food));
                  } else {
                    setSelectedFood([...selectedFood, food]);
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <br />
      <button className="save-btn" onClick={handleSave}>
        Save Preferences
      </button>
      <br />
      <button className="cancel-btn" >
        Cancel
      </button>
    </div>
  );
};

export default EditPreferences;
