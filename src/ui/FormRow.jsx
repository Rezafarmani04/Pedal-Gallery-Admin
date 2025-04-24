import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 20rem 1fr 1.2fr;
    gap: 1.8rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    padding: 1rem 0;

    &:has(button) {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;

  @media (max-width: 768px) {
    margin-bottom: -0.8rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  @media (max-width: 768px) {
    margin-top: -0.8rem;
  }
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && (
        <Label htmlFor={children?.props?.id || undefined}>{label}</Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

export default FormRow;
