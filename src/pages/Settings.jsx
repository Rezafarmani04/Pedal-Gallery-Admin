import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Settings() {
  return (
    <Row style={{ flexDirection: 'column', gap: '3rem' }}>
      <Heading as="h1">تنظیمات</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
