import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import FoodSearch from './components/FoodSearch';
import './index.css';

function App() {
  const [date, setDate] = useState('');
  const [food, setFood] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medication, setMedication] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'allergies'), {
        date,
        food,
        symptoms,
        medication,
        duration,
      });
      alert('Data submitted successfully');
      setDate('');
      setFood('');
      setSymptoms('');
      setMedication('');
      setDuration('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error submitting data');
    }
  };

  return (
    <div className="App">
      <h1>Food Allergy Tracker</h1>
      <p>Track food allergies by documenting when you had a reaction, what you ate, how you felt, medication you took, and how long the discomfort lasted. Recognizing patterns can help avoid problematic foods, leading to better health and preventing allergic reactions.</p>
      <img src="/images/big-9-food-allergens.png" alt="Big 9 food allergens according to the FDA" />

      <h3>Search for foods containing ingredients you're allergic to:</h3>
      <div className="search-container">
        <FoodSearch apiKey="zRaQBSa6rw6dBtr0sABNOb50g8X13o7QH850eaiz" />
      </div>

      <h2>Keep track of your allergic reactions:</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date of Reaction</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date" required />
          </div>
          <div className="form-group">
            <label htmlFor="food">What did you eat?</label>
            <input type="text" value={food} onChange={(e) => setFood(e.target.value)} id="food" required />
          </div>
          <div className="form-group">
            <label htmlFor="symptoms">Describe your symptoms</label>
            <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} id="symptoms" required />
          </div>
          <div className="form-group">
            <label htmlFor="medication">Medication taken (if any)</label>
            <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} id="medication" />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration until reaction subsided</label>
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} id="duration" required />
          </div>
          <div className="button-container">
            <button type="submit" className="flashy-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;