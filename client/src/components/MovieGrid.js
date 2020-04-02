import React from 'react';
import styled from '@emotion/styled';
import MovieCard from './MovieCard';

const GridContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  margin: 10px auto;
  width: 1620px;

  @media (max-width: 1600px) {
    width: 1350px;
  }
  @media (max-width: 1350px) {
    width: 1080px;
  }
  @media (max-width: 1100px) {
    width: 810px;
  }
  @media (max-width: 850px) {
    width: 540px;
  }
  @media (max-width: 600px) {
    width: 270px;
  }
`;

function MovieGrid(props) {
  const { movies } = props;

  return (
    <GridContainer>
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </GridContainer>
  );
}

export default MovieGrid;