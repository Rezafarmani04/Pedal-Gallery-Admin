import styled from 'styled-components';
import Button from './Button';
import Filters from './Filters';
import { useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

const FilterButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
  const ref = useOutsideClick(() => setShowFilters(false), true);

  return (
    <FilterButtonContainer ref={ref}>
      <Button
        onClick={() => setShowFilters(!showFilters)}
        variation="primary"
        size="medium"
      >
        فیلترها
      </Button>
      {showFilters && (
        <FiltersWrapper>
          <Filters />
        </FiltersWrapper>
      )}
    </FilterButtonContainer>
  );
}

export default FilterButton;
