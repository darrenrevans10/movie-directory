import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { isEmpty, concat, uniqBy } from 'lodash';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
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
  margin: auto;
  margin: ${props => (props.isLoading ? 'auto' : 'unset')};
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [recents, setRecents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cleanKeyword = keyword.trim();
    if (isEmpty(cleanKeyword)) return setMovies([]);
    const getData = async() => {
      setLoading(true);
      const response = await axios.get(`/movies/${cleanKeyword}`);
      setLoading(false);
      if (response.data && response.data.Search) updateMovies(response.data.Search);
    };
    getData();
    // eslint-disable-next-line
  }, [keyword]);

  const updateMovies = movieArray => {
    setMovies(movieArray);
    const newRecents = uniqBy(concat(movieArray, recents), 'imdbID');
    setRecents(newRecents);
  };

  return (
    <AppContainer>
      <Banner>
        <span>Dare's Movie Directory</span>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </Banner>

      {!loading && <Header movies={movies} recents={recents} setRecents={setRecents} />}

      <ScrollContainer isLoading={loading}>
        {loading ? <CircularProgress size={80} /> : (
          <MovieGrid movies={movies} recents={recents} />
        )}
      </ScrollContainer>
    </AppContainer>
  );
}

export default App;
