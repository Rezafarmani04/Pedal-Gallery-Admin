import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="نام و نام خانوادگی" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', { required: 'این فیلد را پر کنید' })}
        />
      </FormRow>

      <FormRow label="ایمیل" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'این فیلد را پر کنید',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'یک ایمیل معتبر وارد کنید',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="رمز عبور (حداقل 8 کاراکتر)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'این فیلد را پر کنید',
            minLength: {
              value: 8,
              message: 'رمز عبور حداقل 8 کاراکتر باشد',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="رمز عبور را مجدد وارد کنید"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'این فیلد را پر کنید',
            validate: (value) =>
              value === getValues().password || 'رمز عبور ها باید مشابه باشند',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          لغو
        </Button>
        <Button variation="primary" size="medium" disabled={isLoading}>
          افزودن کاربر جدید
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
