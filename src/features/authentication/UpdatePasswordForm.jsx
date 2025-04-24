import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="رمز عبور (حداقل 8 کاراکتر)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'لطفا این فیلد را پر کنید',
            minLength: {
              value: 8,
              message: 'رمز عبور باید حداقل 8 کاراکتر باشد',
            },
          })}
        />
      </FormRow>

      <FormRow label="تکرار رمز عبور" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'لطفا این فیلد را پر کنید',
            validate: (value) =>
              getValues().password === value ||
              'تکرار رمز عبور باید مشابه باشد',
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={reset}
          type="reset"
          variation="secondary"
          size="medium"
        >
          لغو
        </Button>
        <Button variation="primary" size="medium" disabled={isUpdating}>
          به روزرسانی رمز عبور
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
