import Heading from '../ui/Heading';
import Row from '../ui/Row';
import SearchBar from '../ui/SearchBar';
import styled from 'styled-components';
import FilterButton from '../ui/FilterButton';
import CarsCard from '../features/cars/CarsCard';
import AddCar from '../features/cars/AddCar';
import { useSearchParams } from 'react-router-dom';

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const ControlsRow = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(query) {
    if (query.trim() === '') {
      searchParams.delete('search');
    } else {
      searchParams.set('search', query);
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  return (
    <VerticalLayout>
      <Row type="horizontal">
        <Heading as="h1">خودرو ها</Heading>
      </Row>

      <ControlsRow type="horizontal">
        <SearchBar onSearch={handleSearch} />
      </ControlsRow>

      <ControlsRow type="horizontal">
        <ButtonsContainer>
          <FilterButton />
        </ButtonsContainer>
        <AddCar />
      </ControlsRow>

      <Row type="horizontal">
        <CarsCard />
      </Row>
    </VerticalLayout>
  );
}

export default Cars;
