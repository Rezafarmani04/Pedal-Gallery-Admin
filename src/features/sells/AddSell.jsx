import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateSellForm from './CreateSellForm';
import styled from 'styled-components';

const AddSellContainer = styled.div`
  margin-right: 325px;
  margin-top: 22px;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-top: 20px;
    justify-content: center;
    width: 100%;
  }
`;

function AddSell() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpen() {
    setIsOpenModal(true);
  }

  function handleClose() {
    setIsOpenModal(false);
  }

  return (
    <>
      <AddSellContainer>
        <Button variation="primary" size="medium" onClick={handleOpen}>
          فروش جدید
        </Button>
      </AddSellContainer>

      {isOpenModal && (
        <Modal onClose={handleClose}>
          <CreateSellForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddSell;
