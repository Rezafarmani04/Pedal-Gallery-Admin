import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: { commission, minKeepingDay, maxKeepingDay, vissitingHours } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="حداقل روز های نگهداری خودرو">
        <Input
          type="number"
          id="minkeeping"
          defaultValue={minKeepingDay}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minKeepingDay')}
        />
      </FormRow>
      <FormRow label="حداکثر روز های نگهداری خودرو">
        <Input
          type="number"
          id="maxkeeping"
          defaultValue={maxKeepingDay}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxKeepingDay')}
        />
      </FormRow>
      <FormRow label="درصد فروشنده">
        <Input
          type="text"
          id="percent"
          defaultValue={commission}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'commission')}
        />
      </FormRow>
      <FormRow label="ساعات کاری">
        <Input
          type="text"
          id="workinghours"
          defaultValue={vissitingHours}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'vissitingHours')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
