import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { useDebounce } from '../utils/hooks';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search, Clear } from '@material-ui/icons';

const SearchFilter = styled(TextField)`
  && {
    background-color: #ffffff;
    border-radius: 5px;
    min-width: 300px;

    @media (max-width: 600px) {
      margin-top: 25px;
    }
  }
`;

function SearchBar(props) {
  const { keyword, setKeyword } = props;
  const [search, setSearch] = useState(keyword);
  const dSearch = useDebounce(search, 800);

  const onSearchChange = val => {
    const newKeyword = isEmpty(val) ? '' : val;
    return setSearch(newKeyword);
  };

  useEffect(() => {
    setKeyword(dSearch);
    // eslint-disable-next-line
  }, [dSearch]);

  return (
    <SearchFilter
      placeholder='Search by Movie Title'
      value={search}
      onChange={e => onSearchChange(e.target.value)}
      autoComplete='off'
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            {isEmpty(search) ? <Search /> : (
              <Clear
                style={{ cursor: 'pointer' }}
                onClick={() => onSearchChange('')}
              />
            )}
          </InputAdornment>
        )
      }}
    />
  );
}

export default SearchBar;
