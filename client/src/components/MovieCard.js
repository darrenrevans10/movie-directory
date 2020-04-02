import React from 'react';
import styled from '@emotion/styled';
import MoviePlaceholder from '../utils/images/Movie-placeholder.png';

const CardContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 250px;
  height: 350px;
  margin: 10px;
`;

const Poster = styled.img`
  min-height: 0;
  flex: 1;
  border-radius: 5px;
  box-shadow: 0px 0px 6px 1px #b3b3b3;
`;

const Title = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  margin: 10px 0;
`;

function MovieCard(props) {
  const { movie } = props;

  const onImageErr = ({ target }) => target.src = MoviePlaceholder;

  return (
    <CardContainer>
      <Poster
        src={movie.Poster}
        alt='poster'
        onError={onImageErr}
      />
      <Title>{movie.Title}</Title>
    </CardContainer>
  );
}

export default MovieCard;