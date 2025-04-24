import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { HiXMark } from 'react-icons/hi2';

const StyledConfirmModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem;
  width: auto;
  min-width: 40rem;
  max-width: 90%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-500);
  }
`;

const Content = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

function ConfirmModal({ children, onClose, actions }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Overlay>
      <StyledConfirmModal ref={modalRef}>
        <CloseButton onClick={onClose}>
          <HiXMark />
        </CloseButton>
        <Content>
          {children}
          <Actions>{actions}</Actions>
        </Content>
      </StyledConfirmModal>
    </Overlay>
  );
}

ConfirmModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.node.isRequired,
};

export default ConfirmModal;
