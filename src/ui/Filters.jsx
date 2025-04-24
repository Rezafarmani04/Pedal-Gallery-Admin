import styled from 'styled-components';
import Button from './Button';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const FilterInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    border-color: #0c0b3a;
  }
`;

const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    border-color: #0c0b3a;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

function Filters({ onClose }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const color = searchParams.get('color') || '';
  const kind = searchParams.get('kind') || '';
  const kmNumber = searchParams.get('kmNumber') || '';
  const madeYear = searchParams.get('madeYear') || '';
  const price = searchParams.get('price') || '';

  function handleFilterChange(e, filterName) {
    const value = e.target.value;
    if (value) {
      searchParams.set(filterName, value);
    } else {
      searchParams.delete(filterName);
    }
    setSearchParams(searchParams);
  }

  function handleResetFilters() {
    setSearchParams({});
    onClose?.();
  }

  function handleApplyFilters() {
    onClose?.();
  }

  return (
    <FiltersContainer>
      <FilterGroup>
        <FilterLabel>رنگ خودرو</FilterLabel>
        <FilterSelect
          value={color}
          onChange={(e) => handleFilterChange(e, 'color')}
        >
          <option value="">همه رنگ‌ها</option>
          <option value="مشکی">مشکی</option>
          <option value="سفید">سفید</option>
          <option value="نوک مدادی">نوک مدادی</option>
          <option value="نقره ای">نقره ای</option>
          <option value="آبی">آبی</option>
          <option value="قهوه ای">قهوه ای</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>نوع خودرو</FilterLabel>
        <FilterSelect
          value={kind}
          onChange={(e) => handleFilterChange(e, 'kind')}
        >
          <option value="">همه</option>
          <option value="سدان">سدان</option>
          <option value="شاسی بلند">شاسی‌ بلند</option>
          <option value="شاسی بلند کوچک">شاسی‌ بلند کوچک</option>
          <option value="کراس اور">کراس اور</option>
          <option value="هاچ‌بک">هاچ‌بک</option>
          <option value="کوپه">کوپه</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>کارکرد خودرو (کیلومتر)</FilterLabel>
        <FilterSelect
          value={kmNumber}
          onChange={(e) => handleFilterChange(e, 'kmNumber')}
        >
          <option value="">همه</option>
          <option value="50">تا 50</option>
          <option value="100">تا 100</option>
          <option value="150">تا 150</option>
          <option value="200">تا 200</option>
          <option value="201">بیشتر از 200</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>سال تولید خودرو</FilterLabel>
        <FilterInput
          type="number"
          placeholder="مثلاً 1395"
          value={madeYear}
          onChange={(e) => handleFilterChange(e, 'madeYear')}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>قیمت خودرو (تومان)</FilterLabel>
        <FilterSelect
          value={price}
          onChange={(e) => handleFilterChange(e, 'price')}
        >
          <option value="">همه</option>
          <option value="1/000">پایین تر از 1/000 تومان</option>
          <option value="1/500">تا 1/500</option>
          <option value="2/000">تا 2/000</option>
          <option value="2/500">تا 2/500</option>
          <option value="3/000">تا 3/000</option>
          <option value="3/100">بالاتر از 3/000 تومان</option>
        </FilterSelect>
      </FilterGroup>

      <ButtonsContainer>
        <Button variation="secondary" size="small" onClick={handleResetFilters}>
          حذف فیلترها
        </Button>
        <Button variation="primary" size="small" onClick={handleApplyFilters}>
          اعمال فیلترها
        </Button>
      </ButtonsContainer>
    </FiltersContainer>
  );
}

Filters.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Filters;
