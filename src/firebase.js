import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7Qq73tOYhi3HH5jBPbY18GtKA4pO8cmI",
  authDomain: "food-allergy-tracker-3c193.firebaseapp.com",
  projectId: "food-allergy-tracker-3c193",
  storageBucket: "food-allergy-tracker-3c193.appspot.com",
  messagingSenderId: "920789956906",
  appId: "1:920789956906:web:4e68d4e7a516b330324653"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };