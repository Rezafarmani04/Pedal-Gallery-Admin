import styled from 'styled-components';
import Button from './Button';
import Filters from './Filters';
import { useState } from 'react';

import { useOutsideClick } from '../hooks/useOutsideClick';

const FilterButtonContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-right: 30px;
  display: flex;
  gap: 20px;
`;

const FiltersWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;

  margin-top: 10px;
  z-index: 1000;
`;

function FilterButton() {
  const [showFilters, setShowFilters] = useState(false);

  const ref = useOutsideClick(() => {
    setShowFilters(false);
  }, true);

  function openFilters() {
    setShowFilters((showFilters) => !showFilters);
  }

  return (
    <>
      <FilterButtonContainer ref={ref}>
        <div style={{ marginRight: '100px', marginTop: '' }}>
          <Button onClick={openFilters} variation="primary" size="medium">
            فیلترها
          </Button>
        </div>

        {showFilters && (
          <FiltersWrapper>
            <Filters />
          </FiltersWrapper>
        )}
      </FilterButtonContainer>
    </>
  );
}

export default FilterButton;
