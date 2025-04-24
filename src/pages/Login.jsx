import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  direction: rtl;

  @media (max-width: 768px) {
    grid-template-columns: 40rem;
    gap: 2.4rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 1.6rem;
    gap: 2rem;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Heading as="h4">وارد حساب خود شوید</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
