import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_SIZE } from '../utils/constants';
import PropTypes from 'prop-types';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? 'var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? 'var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    padding: 0.2rem 0.6rem;
    font-size: 1rem;

    span {
      display: ${(props) => (props.hideTextOnMobile ? 'none' : 'inline')};
    }
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 0.4rem;

  @media (max-width: 768px) {
    gap: 0.2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function goToPage(page) {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    goToPage(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    goToPage(prev);
  }

  if (pageCount <= 1) return null;

  function renderPageNumbers() {
    if (window.innerWidth <= 768) {
      const pages = [];
      const maxVisible = 3;
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(pageCount, currentPage + 1);

      if (currentPage <= 2) {
        end = Math.min(pageCount, maxVisible);
      } else if (currentPage >= pageCount - 1) {
        start = Math.max(1, pageCount - maxVisible + 1);
      }

      if (start > 1) {
        pages.push(
          <PaginationButton
            key={1}
            onClick={() => goToPage(1)}
            active={1 === currentPage}
            disabled={1 === currentPage}
          >
            {1}
          </PaginationButton>
        );
        if (start > 2) {
          pages.push(<span key="start-ellipsis">...</span>);
        }
      }

      for (let i = start; i <= end; i++) {
        if (i === 1 && start !== 1) continue;
        pages.push(
          <PaginationButton
            key={i}
            onClick={() => goToPage(i)}
            active={i === currentPage}
            disabled={i === currentPage}
          >
            {i}
          </PaginationButton>
        );
      }

      if (end < pageCount) {
        if (end < pageCount - 1) {
          pages.push(<span key="end-ellipsis">...</span>);
        }
        pages.push(
          <PaginationButton
            key={pageCount}
            onClick={() => goToPage(pageCount)}
            active={pageCount === currentPage}
            disabled={pageCount === currentPage}
          >
            {pageCount}
          </PaginationButton>
        );
      }

      return pages;
    } else {
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        pages.push(
          <PaginationButton
            key={i}
            onClick={() => goToPage(i)}
            active={i === currentPage}
            disabled={i === currentPage}
          >
            {i}
          </PaginationButton>
        );
      }
      return pages;
    }
  }

  return (
    <StyledPagination>
      <Buttons>
        <PaginationButton
          onClick={prevPage}
          disabled={currentPage === 1}
          hideTextOnMobile
        >
          <HiChevronRight />
          <span>قبلی</span>
        </PaginationButton>

        <PageNumbers>{renderPageNumbers()}</PageNumbers>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
          hideTextOnMobile
        >
          <span>بعدی</span>
          <HiChevronLeft />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Pagination;
