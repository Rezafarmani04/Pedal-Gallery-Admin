import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCarForm from './CreateCarForm';
import styled from 'styled-components';

const AddCarContainer = styled.div`
  display: flex;
  align-items: center;
`;

function AddCar() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <AddCarContainer>
      <Button
        variation="primary"
        size="medium"
        onClick={() => setIsOpenModal(true)}
      >
        خودرو جدید
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCarForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </AddCarContainer>
  );
}

export default AddCar;
