import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getCars } from '../../services/apiCars';
import Spinner from '../../ui/Spinner';
import DropDownMenu from '../../ui/DropDownMenu';
import Pagination from '../../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCar } from '../../services/apiCars';
import EditCarModal from '../../ui/EditCarModal';
import Button from '../../ui/Button';

const CarsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding: 30px;
  max-width: 840px;
  margin: 0 auto;
`;

const CarCard = styled.div`
  width: 300px;
  height: 320px;
  border: 2px solid #eef2ff;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  position: relative;
  flex-direction: column;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CarImage = styled.div`
  height: 48%;
  background-color: #86859d;
  background-size: cover;
  margin: 10px 10px 0 10px;
  // border: 1px solid #86859d;
  border-radius: 8px;
  background-position: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const CarInfo = styled.div`
  height: 60%;
  padding: 10px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #0c0b3a;
  font-size: 0.9rem;
`;

const CarName = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
`;

const CarDetail = styled.p`
  margin: 0;
  font-weight: 550;
  font-size: 1.3rem;
`;

const DropDownContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: inline-block;
  background-color: #fff;
  border-radius: 8px;
  // border: 2px solid #eef2ff;
`;

function CarsCard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [carToDelete, setCarToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingCars,
    data: cars,
    error,
  } = useQuery({
    queryKey: ['car', searchParams.toString()],
    queryFn: getCars,
  });

  const { mutate: deleteCarMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success('خودرو با موفقیت حذف شد');
      queryClient.invalidateQueries(['car']);
      setCarToDelete(null);
    },
    onError: (err) => {
      toast.error(err.message);
      setCarToDelete(null);
    },
  });

  if (isLoadingCars) return <Spinner />;
  if (error) return <div>خطا در دریافت اطلاعات خودروها</div>;

  if (!cars || cars.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          width: '100%',
        }}
      >
        <p style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>
          {searchParams.toString()
            ? 'هیچ خودرویی با فیلترهای انتخاب شده یافت نشد'
            : 'هیچ خودرویی در سیستم ثبت نشده است'}
        </p>
        {searchParams.toString() && (
          <Button
            variation="primary"
            size="medium"
            onClick={() => setSearchParams({})}
          >
            حذف همه فیلترها
          </Button>
        )}
      </div>
    );
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedCars = cars.slice(startIndex, endIndex);

  function handleDeleteCar(carId) {
    setCarToDelete(carId);
  }

  function handleConfirmDelete() {
    deleteCarMutation(carToDelete);
  }

  function handleCancelDelete() {
    setCarToDelete(null);
  }

  function handleEditCar(car) {
    setSelectedCar(car);
    setShowEditModal(true);
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
    setSelectedCar(null);
  }

  return (
    <>
      <CarsContainer>
        {paginatedCars.map((car) => (
          <CarCard key={car.id}>
            <CarImage>
              <img src={car.image} alt={car.name} />
            </CarImage>
            <CarInfo>
              <CarName>{car.name}</CarName>
              <CarDetail>نوع: {car.kind}</CarDetail>
              <CarDetail>رنگ: {car.color}</CarDetail>
              <CarDetail>کارکرد: {car.kmNumber} کیلومتر</CarDetail>
              <CarDetail>تولید: {car.madeYear}</CarDetail>
              <CarDetail>قیمت: {car.price} تومان</CarDetail>
            </CarInfo>
            <DropDownContainer>
              <DropDownMenu
                onEdit={() => handleEditCar(car)}
                onDeleteClick={() => handleDeleteCar(car.id)}
              />
            </DropDownContainer>
          </CarCard>
        ))}
        <Pagination count={cars.length} />
      </CarsContainer>

      {carToDelete && (
        <ConfirmDelete
          resourceName="خودرو"
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
          disabled={isDeleting}
        />
      )}

      {showEditModal && (
        <EditCarModal onClose={handleCloseEditModal} carToEdit={selectedCar} />
      )}
    </>
  );
}

export default CarsCard;
