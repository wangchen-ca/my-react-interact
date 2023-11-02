import React, { useState } from 'react';

const SelectedCandidatesTable = ({ selectedCandidates, onCandidateRemove, onCandidateRestore }) => {
  const [welcome, setWelcome] = useState(true); // Initialize welcome state
  return (
    <div className="AvailableCandidates">
      <h2>Selected Candidates</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {welcome && (
            <tr>
              <td
                data-testid="selection-rules"
                colSpan="3"
              >
                <p
                  
                  style={{ textAlign: "right" }}
                  onClick={() => setWelcome(false)}
                >
                  X
                </p>
                {/* Show instructions when welcome is true */}
                  <div>
                    <h3 style={{ textAlign: "center" }}>
                      <strong>Welcome to Project Selection</strong>
                    </h3>
                    11 candidates are required in a project <br />
                    3-6 Developers are allowed in a team
                    <br />
                    Only 1 Business Analyst required in a team
                    <br />
                    1-4 System Analyst allowed in a team
                  </div>
              </td>
            </tr>
          )}
          {selectedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.type}</td>
              <td>
                <button onClick={() => onCandidateRemove(candidate)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedCandidatesTable;
