import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { isEmpty, concat } from 'lodash';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #24232e;
  font-size: 24px;
  color: #ffffff;
  padding: 18px 30px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    flex-flow: column;
  }
`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [recents, setRecents] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const cleanKeyword = keyword.trim();
    if (isEmpty(cleanKeyword)) return setMovies([]);
    const getData = async() => {
      const response = await axios.get(`/movies/${cleanKeyword}`);
      if (response.data && response.data.Search) updateMovies(response.data.Search);
    };
    getData();
    // eslint-disable-next-line
  }, [keyword]);

  const updateMovies = movieArray => {
    const newRecents = concat(recents, movieArray);
    setMovies(movieArray);
    setRecents(newRecents);
  };

  return (
    <AppContainer>
      <Banner>
        <span>Dare's Movie Directory</span>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </Banner>
      <ScrollContainer>
        <MovieGrid movies={movies} />
      </ScrollContainer>
    </AppContainer>
  );
}

export default App;
