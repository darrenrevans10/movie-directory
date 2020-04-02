import React from 'react';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { Button } from '@material-ui/core';
import PopcornImage from '../utils/images/Popcorn.png';

const EmptyWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: 18px;
  margin: auto;
`;

const RecentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  font-size: 20px;
  font-weight: bold;
  padding: 0 50px 15px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);

  @media (max-width: 600px) {
    padding: 0 15px 15px;
  }
`;

const Image = styled.img`
  width: 250px;
`;

const ClearButton = styled(Button)`
  && {
    font-weight: bold;
    font-size: 14px;
  }
`;

function Header(props) {
  const { movies, recents, setRecents } = props;
  const isEmptyList = isEmpty(movies) && isEmpty(recents);
  const isRecentList = isEmpty(movies) && !isEmpty(recents);

  if (isEmptyList) return (
    <EmptyWrapper>
      <Image src={PopcornImage} alt='popcorn' />
      <span>Start by searching for a movie title</span>
    </EmptyWrapper>
  );

  if (isRecentList) return (
    <RecentWrapper>
      <span>{`Recents (${recents.length})`}</span>
      <ClearButton color='primary' variant='outlined' onClick={() => setRecents([])}>
        Clear Recents
      </ClearButton>
    </RecentWrapper>
  );

  return null;
}

export default Header;