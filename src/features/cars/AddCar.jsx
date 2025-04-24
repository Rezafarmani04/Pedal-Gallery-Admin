import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCarForm from './CreateCarForm';
import styled from 'styled-components';

const AddCarContainer = styled.div`
  margin-left: 900px;
  margin-top: 22px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

function AddCar() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpen() {
    setIsOpenModal(true);
  }

  function handleClose() {
    setIsOpenModal(false);
  }

  return (
    <>
      <AddCarContainer>
        <Button variation="primary" size="medium" onClick={handleOpen}>
          خودرو جدید
        </Button>
      </AddCarContainer>

      {isOpenModal && (
        <Modal onClose={handleClose}>
          <CreateCarForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCar;
