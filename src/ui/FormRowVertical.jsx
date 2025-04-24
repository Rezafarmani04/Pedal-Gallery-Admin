import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;

  @media (max-width: 480px) {
    gap: 0.6rem;
    padding: 1rem 0;
  }
`;

const Label = styled.label`
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

FormRowVertical.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormRowVertical;
