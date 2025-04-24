import styled, { css } from 'styled-components';
import { useState } from 'react';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem;
  display: flex;
  gap: 0.6rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.6rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const DiscountFilter = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <StyledFilter>
      <FilterButton
        onClick={() => handleFilterClick('all')}
        active={activeFilter === 'all'}
      >
        همه
      </FilterButton>
      <FilterButton
        onClick={() => handleFilterClick('discounted')}
        active={activeFilter === 'discounted'}
      >
        با تخفیف
      </FilterButton>
      <FilterButton
        onClick={() => handleFilterClick('no-discount')}
        active={activeFilter === 'no-discount'}
      >
        بدون تخفیف
      </FilterButton>
    </StyledFilter>
  );
};

export default DiscountFilter;
