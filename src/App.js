// App.js
import React, { useState, useEffect  } from 'react';
import './App.css';
// import candidatesData from './candidates';
import AvailableCandidatesTable from './AvailableCandidatesTable';
import SelectedCandidatesTable from './SelectedCandidatesTable';

//
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { GET_CANDIDATES } from './queries';

/*
By initializing the graphQL ApolloClient outside of the component, 
you ensure that it is only created once during the lifetime of your application, 
and it can be reused across multiple components. 
if not, the client will be created every time React check to refresh, 
which cause infinitive loop of network fetching data, 
the page will stuck at showing Loading... 
*/
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [availableCandidates, setAvailableCandidates] = useState([]);  //candidatesData
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [disabledCandidates, setDisabledCandidates] = useState([]);
  
  //---------------------------------------------
  // Initialize Apollo Client
  const { loading, error, data } = useQuery(GET_CANDIDATES, {
    client: client,
  });

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      setAvailableCandidates(data.candidates);
    }
  }, [loading, data]);    
  //--------------------------------------------


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

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

    
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
