import React from 'react';
import './App.css';
import axios from 'axios';
import { Button } from '@material-ui/core';

function App() {

  const getData = async() => {
    const response = await axios.get('/movies/batman');
    console.log('Movies!', response.data.Search);
  };

  return (
    <div className="App">
      <Button onClick={getData}>
        Click me for movies!
      </Button>
    </div>
  );
}

export default App;
