import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/Logo.png" alt="لوگو" />
    </StyledLogo>
  );
}

export default Logo;
