// App.js
import React, { useState } from 'react';
import './App.css';
import candidatesData from './candidates';
import AvailableCandidatesTable from './AvailableCandidatesTable';
import SelectedCandidatesTable from './SelectedCandidatesTable';

function App() {
  const [availableCandidates, setAvailableCandidates] = useState(candidatesData);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [disabledCandidates, setDisabledCandidates] = useState([]);

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
