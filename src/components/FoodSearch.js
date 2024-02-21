import React, { useState } from 'react';
import './FoodSearch.css';

function FoodSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "zRaQBSa6rw6dBtr0sABNOb50g8X13o7QH850eaiz";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setError('');
    setHasSearched(true);
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      const uniqueResults = removeDuplicates(data.foods || []);
      setSearchResults(uniqueResults.slice(0, 10));
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  function removeDuplicates(foods) {
    const uniqueDescriptions = new Set();
    const uniqueFoods = [];

    foods.forEach(food => {
      if (!uniqueDescriptions.has(food.description)) {
        uniqueFoods.push(food);
        uniqueDescriptions.add(food.description);
      }
    });

    return uniqueFoods;
  }

  const handleReset = () => {
    setSearchTerm('');
    setSearchResults([]);
    setError('');
    setHasSearched(false);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          placeholder="Search for foods"
        />
        <button type="submit" className="search-button">Search</button>
        <button type="button" onClick={handleReset} className="reset-button">Reset</button>
      </form>
      {error && <p>Error: {error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {hasSearched && searchResults.length === 0 && !error && <p>No results found</p>}
          {searchResults.map((food, index) => (
            <div key={index}>
              <p>{food.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodSearch;