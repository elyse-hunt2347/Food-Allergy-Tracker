import React, { useState } from 'react';
import { db } from '../firebase-config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateForm = () => {
  const [date, setDate] = useState(new Date());
  const [food, setFood] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medication, setMedication] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.collection('allergies').add({
      date: date.toISOString(),
      food,
      symptoms,
      medication,
      duration
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <input type="text" value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food" />
      <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Symptoms"></textarea>
      <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} placeholder="Medication" />
      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateForm;