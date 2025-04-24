import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiMoreVertical } from 'react-icons/fi';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';


const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropDownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #0c0b3a;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  &:focus {
    outline: none;
  }
`;

const DropDownContent = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid #eef2ff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 100px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
`;

const DropDownItem = styled.div`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

function DropDownMenu({ onDeleteClick, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  function handleItemClick(handler) {
    handler();
    setIsOpen(false);
  }

  return (
    <>
      <DropDownContainer ref={ref}>
        <DropDownButton onClick={() => setIsOpen(!isOpen)}>
          <FiMoreVertical />
        </DropDownButton>
        <DropDownContent $isOpen={isOpen}>
          <DropDownItem
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
          >
            <HiPencil /> ویرایش
          </DropDownItem>
          <DropDownItem onClick={() => handleItemClick(onDeleteClick)}>
            <HiTrash /> حذف
          </DropDownItem>
        </DropDownContent>
      </DropDownContainer>
    </>
  );
}

DropDownMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default DropDownMenu;
