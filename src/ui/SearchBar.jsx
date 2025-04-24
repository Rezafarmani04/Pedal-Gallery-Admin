import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 20px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: transparent;

  &::placeholder {
    color: #888;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #0c0b3a;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6d6d89;
  }
`;

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleSearch() {
    onSearch(query);
  }

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="جستجو کنید..."
        value={query}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch}>جستجو</SearchButton>
    </SearchBarContainer>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
