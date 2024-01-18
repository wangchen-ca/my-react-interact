// App.js
import React, { useState } from 'react';
import './App.css';
//import candidatesData from './candidates';
import {useEffect} from 'react';
import AvailableCandidatesTable from './AvailableCandidatesTable';
import SelectedCandidatesTable from './SelectedCandidatesTable';

function App() {
  const [availableCandidates, setAvailableCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [disabledCandidates, setDisabledCandidates] = useState([]);

  useEffect(() => {
    // Define an async function to fetch data
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/candidates');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetched data=" + { data });
        setAvailableCandidates(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts





  const handleCandidateSelect = (candidate) => {
    const updatedSelectedCandidates = [...selectedCandidates, candidate];
    setSelectedCandidates(updatedSelectedCandidates);
    setDisabledCandidates([...disabledCandidates, candidate.id]);
  };

  const handleCandidateRemove = (candidate) => {
    const updatedSelectedCandidates = selectedCandidates.filter((c) => c.id !== candidate.id);
    setSelectedCandidates(updatedSelectedCandidates);
    const updatedAvailableCandidates = [...availableCandidates, candidate];
    setAvailableCandidates(updatedAvailableCandidates);
    const updatedDisabledCandidates = disabledCandidates.filter((id) => id !== candidate.id);
    setDisabledCandidates(updatedDisabledCandidates);
  };

  const handleCandidateRestore = (id) => {
    const updatedDisabledCandidates = disabledCandidates.filter((candidateId) => candidateId !== id);
    setDisabledCandidates(updatedDisabledCandidates);
  };

  return (
    <div className="App">
      <AvailableCandidatesTable
        candidates={availableCandidates}
        onCandidateSelect={handleCandidateSelect}
        disabledCandidates={disabledCandidates}
      />
      <SelectedCandidatesTable
        selectedCandidates={selectedCandidates}
        onCandidateRemove={handleCandidateRemove}
        onCandidateRestore={handleCandidateRestore}
      />
    </div>
  );
}

export default App;
