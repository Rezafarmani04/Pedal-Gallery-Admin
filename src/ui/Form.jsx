import styled, { css } from 'styled-components';

const Form = styled.form`
  ${(props) =>
    props.type !== 'modal' &&
    css`
      padding: 2.4rem 2.4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      max-width: 700px;
      margin: 0 auto;
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;

  @media (max-width: 1024px) {
    ${(props) =>
      props.type === 'modal' &&
      css`
        width: 90%;
      `}
  }

  @media (max-width: 768px) {
    ${(props) =>
      props.type !== 'modal' &&
      css`
        padding: 1.8rem 1.8rem;
      `}

    ${(props) =>
      props.type === 'modal' &&
      css`
        width: 95%;
      `}
  }
`;

export default Form;
