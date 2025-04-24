import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import CreateCarForm from '../features/cars/CreateCarForm';
import PropTypes from 'prop-types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
`;

function EditCarModal({ onClose, carToEdit }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <CloseButton onClick={onClose}>
          <HiXMark />
        </CloseButton>
        <CreateCarForm onSuccess={onClose} carToEdit={carToEdit} />
      </ModalContent>
    </ModalOverlay>
  );
}

EditCarModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  carToEdit: PropTypes.func.isRequired,
};

export default EditCarModal;
