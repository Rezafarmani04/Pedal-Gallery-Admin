import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import SearchBar from '../ui/SearchBar';
import FilterButton from '../ui/FilterButton';
import CarsCard from '../features/cars/CarsCard';
import AddCar from '../features/cars/AddCar';
import { useSearchParams } from 'react-router-dom';

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 15px;
    margin-top: 5px;
  }
`;

const ControlsRow = styled(Row)`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (query) => {
    const newParams = new URLSearchParams(searchParams);
    query.trim() ? newParams.set('search', query) : newParams.delete('search');
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <VerticalLayout>
      <Row type="horizontal">
        <Heading as="h1">خودرو ها</Heading>
      </Row>

      <ControlsRow type="horizontal">
        <ControlsContainer>
          <SearchBarWrapper>
            <SearchBar onSearch={handleSearch} />
          </SearchBarWrapper>
          <ButtonsGroup>
            <FilterButton />
            <AddCar />
          </ButtonsGroup>
        </ControlsContainer>
      </ControlsRow>

      <Row type="horizontal">
        <CarsCard />
      </Row>
    </VerticalLayout>
  );
}

export default Cars;
