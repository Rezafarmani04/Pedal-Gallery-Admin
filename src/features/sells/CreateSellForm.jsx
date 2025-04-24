import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createSell } from '../../services/apiSells';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import PropTypes from 'prop-types';

function CreateSellForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createSell,
    onSuccess: () => {
      toast.success('فروش جدید شما اضافه شد');
      queryClient.invalidateQueries({ queryKey: ['sold'] });
      reset();
      onCloseModal?.();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(formData) {
    mutate(formData);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="نام خودرو" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>

      <FormRow label="قیمت" error={errors?.price?.message}>
        <Input
          type="text"
          id="price"
          disabled={isCreating}
          {...register('price', {
            required: 'این فیلد را پر کنید',
            min: {
              value: 100,
              message: 'قیمت باید بیشتر از 100 باشد',
            },
          })}
        />
      </FormRow>

      <FormRow label="تاریخ فروش" error={errors?.date?.message}>
        <Input
          type="date"
          id="date"
          disabled={isCreating}
          {...register('date', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          size="small"
          type="button"
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
        >
          لغو
        </Button>
        <Button variation="primary" size="small" disabled={isCreating}>
          {isCreating ? 'در حال ثبت...' : 'افزودن'}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateSellForm.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default CreateSellForm;
