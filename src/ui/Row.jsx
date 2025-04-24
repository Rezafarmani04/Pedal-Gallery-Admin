import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}


  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: row;
    gap: 1.2rem;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 1.6rem;
  }
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
