import React , { useState }from 'react';
import CandidateDetailsPopup from './CandidateDetailsPopup'; // Import the popup component

const AvailableCandidatesTable = ({ candidates, onCandidateSelect, disabledCandidates }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const openCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeCandidateDetails = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="AvailableCandidates">
      <h2>Available Candidates</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              style={{
                backgroundColor: disabledCandidates.includes(candidate.id) ? 'grey' : 'white',
              }}
            >
              <td>
                <button
                  onClick={() => openCandidateDetails(candidate)}
                  style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {candidate.name}
                </button>
              </td>
              <td>{candidate.type}</td>
              <td>
                <button
                  onClick={() => onCandidateSelect(candidate)}
                  disabled={disabledCandidates.includes(candidate.id)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCandidate && (
        <CandidateDetailsPopup
          candidate={selectedCandidate}
          onSelect={(candidate) => {
            onCandidateSelect(candidate);
            closeCandidateDetails();
          }}
          onClose={closeCandidateDetails}
        />
      )}
    </div>
  );
};

export default AvailableCandidatesTable;
