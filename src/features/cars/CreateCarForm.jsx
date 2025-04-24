import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { createCar } from '../../services/apiCars';

function CreateCarForm({ carToEdit = {} }) {
  const { id: editId, ...editValues } = carToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      toast.success('خودرو جدید اضافه شد');
      queryClient.invalidateQueries({ queryKey: ['car'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCar, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCarData, id }) => createCar(newCarData, id),
    onSuccess: () => {
      toast.success('مشخصات تغغیر یافت');
      queryClient.invalidateQueries({ queryKey: ['car'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) editCar({ newCarData: { ...data, image }, id: editId });
    else mutate({ ...data, image: image });
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
          disabled={isWorking}
          {...register('name', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>

      <FormRow label="برند خودرو" error={errors?.brand?.message}>
        <Input
          type="text"
          id="brand"
          disabled={isWorking}
          {...register('brand', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>

      <FormRow label="نوع خودرو" error={errors?.kind?.message}>
        <Input
          type="text"
          id="kind"
          disabled={isWorking}
          {...register('kind', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>

      <FormRow label="سال ساخت" error={errors?.madeYear?.message}>
        <Input
          type="number"
          id="madeYear"
          disabled={isWorking}
          {...register('madeYear', {
            required: 'این فیلد را پر کنید',
            min: {
              value: 1300,
              message: 'سال ساخت باید معتبر باشد',
            },
            max: {
              value: new Date().getFullYear(),
              message: 'سال ساخت نمی‌تواند از سال جاری بیشتر باشد',
            },
          })}
        />
      </FormRow>

      <FormRow label="وضعیت شاسی ها" error={errors?.chassis?.message}>
        <Input
          type="text"
          id="chassis"
          disabled={isWorking}
          {...register('chassis', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>

      <FormRow label="کارکرد (کیلومتر)" error={errors?.kmNumber?.message}>
        <Input
          type="number"
          id="kmNumber"
          disabled={isWorking}
          {...register('kmNumber', {
            required: 'این فیلد را پر کنید',
            min: {
              value: 0,
              message: 'کارکرد نمی‌تواند منفی باشد',
            },
          })}
        />
      </FormRow>
      <FormRow label="رنگ خودرو" error={errors?.color?.message}>
        <Input
          type="text"
          id="color"
          disabled={isWorking}
          {...register('color', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>

      <FormRow label="رنگ شدگی ها" error={errors?.paintedParts?.message}>
        <Input
          type="number"
          id="paintedParts"
          disabled={isWorking}
          {...register('paintedParts', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>
      <FormRow label="قیمت خودرو" error={errors?.regularPrice?.message}>
        <Input
          type="text"
          id="price"
          disabled={isWorking}
          {...register('price', {
            required: 'این فیلد را پر کنید',
            min: {
              value: 200,
              message: 'حداقل قیمت 200 هست',
            },
          })}
        />
      </FormRow>
      <FormRow label="تخفیف" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'این فیلد را پر کنید',
            validate: (value) =>
              value <= getValues().price || 'تخفیف باید کمتر از قیمت باشد',
          })}
        />
      </FormRow>
      <FormRow
        label="توضیحات"
        disabled={isWorking}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: isEditSession ? false : 'این فیلد را پر کنید',
          })}
        />
      </FormRow>
      <FormRow label="عکس خودرو">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'این فیلد را پر کنید',
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" size="small" type="reset">
          لغو
        </Button>
        <Button disabled={isWorking} variation="primary" size="small">
          {isCreating ? 'در حال ثبت...' : 'افزودن'}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCarForm.propTypes = {
  carToEdit: PropTypes.func.isRequired,
};

export default CreateCarForm;
