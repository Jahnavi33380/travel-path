import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDatabase, ref, get, update } from "firebase/database";
import "./EditPreferences.css";

const Chip = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      margin: "5px",
      padding: "5px 10px",
      borderRadius: "20px",
      border: "none",
      backgroundColor: selected ? "#007bff" : "#f0f0f0",
      color: selected ? "white" : "black",
      cursor: "pointer",
    }}
  >
    {label}
  </button>
);

const EditPreferences = ({ onClose }) => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(
    location.state?.userDetails || JSON.parse(localStorage.getItem("user"))
  );
  const [interests, setInterests] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);


  useEffect(() => {
    if (!userDetails || !userDetails.id) {
      console.error("User details are missing");
      return;
    }

    const fetchUserPreferences = async () => {
      const db = getDatabase();
      const userRef = ref(db, `users/${userDetails.id}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setSelectedInterests(userData.interests || []);
        setSelectedFood(userData.foodPreferences || []);
      } else {
        console.warn("No user preferences found.");
      }
    };

    fetchUserPreferences();
  }, [userDetails]);

  useEffect(() => {
    const fetchPreferences = async () => {
      const db = getDatabase();
      const interestsRef = ref(db, "interests");
      const foodRef = ref(db, "food");
      const [interestsSnapshot, foodSnapshot] = await Promise.all([
        get(interestsRef),
        get(foodRef),
      ]);

      if (interestsSnapshot.exists()) {
        setInterests(interestsSnapshot.val());
      } else {
        console.warn("No interests data found.");
      }

      if (foodSnapshot.exists()) {
        setFoodPreferences(foodSnapshot.val());
      } else {
        console.warn("No food preferences data found.");
      }
    };

    fetchPreferences();
  }, []);

  const handleSave = async () => {
    if (!userDetails || !userDetails.id) {
      console.error("User details are missing");
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${userDetails.id}`);

    try {
      await update(userRef, {
        interests: selectedInterests,
        foodPreferences: selectedFood,
      });

      const updatedUserDetails = {
        ...userDetails,
        interests: selectedInterests,
        foodPreferences: selectedFood,
      };

      localStorage.setItem("user", JSON.stringify(updatedUserDetails));
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="edit-preferences-page">
      <h2 className="hello">Edit Preferences</h2>
      <div>
        <h3 className="category-header">Interests</h3>
        <div className="category-content">
        {Object.entries(interests).map(([category, items]) => (
          <div key={category}>
            <h4>{category}</h4>
            {items.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                selected={selectedInterests.includes(interest)}
                onClick={() => {
                  setSelectedInterests((prev) =>
                    prev.includes(interest)
                      ? prev.filter((i) => i !== interest)
                      : [...prev, interest]
                  );
                }}
              />
            ))}
          </div>
        ))}
        </div>
      </div>
      <div>
        <h3 className="category-header">Food Preferences</h3>
        <div className="category-content">
        {Object.entries(foodPreferences).map(([category, items]) => (
          <div key={category}>
            <h4>{category}</h4>
            {items.map((food, index) => (
              <Chip
                key={index}
                label={food}
                selected={selectedFood.includes(food)}
                onClick={() => {
                  setSelectedFood((prev) =>
                    prev.includes(food)
                      ? prev.filter((f) => f !== food)
                      : [...prev, food]
                  );
                }}
              />
            ))}
          </div>
        ))}
        </div>
      </div>
      <br />
      <button className="save-btn" onClick={handleSave}>
        Save Preferences
      </button>
      <br />
      <br/>
      <button className="cancel-btn" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default EditPreferences;
