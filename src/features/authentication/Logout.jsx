import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import Spinner from '../../ui/Spinner';
import ButtonIcon from '../../ui/ButtonIcon';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <Spinner />}
    </ButtonIcon>
  );
}

export default Logout;
