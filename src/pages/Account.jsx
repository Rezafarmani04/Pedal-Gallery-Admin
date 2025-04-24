import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account() {
  return (
    <>
      <Heading style={{ marginBottom: '30px' }} as="h1">
        مشخصات خود را به روزرسانی کنید
      </Heading>

      <Row
        style={{
          marginBottom: '30px',
          padding: '30px',
        }}
      >
        <Heading as="h3"></Heading>
        <UpdateUserDataForm />
      </Row>

      <Heading as="h3">رمز عبور خود را به روزرسانی کنید</Heading>

      <Row
        style={{
          marginTop: '10px',
          padding: '30px',
        }}
      >
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
