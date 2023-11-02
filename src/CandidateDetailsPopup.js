import React from 'react';

const CandidateDetailsPopup = ({ candidate, onSelect, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <h2>Candidate Details</h2>
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Type:</strong> {candidate.type}</p>
          {/* Add more details as needed */}
          <div className="popup-buttons">
            <button onClick={() => onSelect(candidate)}>Select</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPopup;
