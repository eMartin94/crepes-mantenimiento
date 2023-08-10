import { useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/modals/Modal';
import { useCategory } from '../../context/useCategory';
import AlertSuccess from '../../components/modals/AlertSuccess';
import AlertDanger from '../../components/modals/AlertDanger';

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { addNewCategory, errors: CategoryErrors, successMessage } = useCategory();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    data.nombre = data.nombre.toLowerCase();
    try {
      await addNewCategory(data);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const handleConfirm = () => {
    setShowModal(false);
    reset();
  };
  const handleCancelClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className='flex flex-wrap justify-center pt-2 animate-zoom-in'>
      <div className='bg-primary-10 shadow-md rounded px-8 pt-6 pb-8 w-full'>
        <h4 className='text-2xl font-bold mb-4 uppercase text-complementary-100'>
          Nueva categoría
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Input
            label='nombre de categoria'
            name='nombre'
            register={register}
            errors={errors}
            isRequired={true}
            setValue={setValue}
          />
          <div className='w-full flex flex-row gap-4 justify-end items-center mt-10'>
            <Link
              to='#'
              className=' border-secondary-70 rounded hover:bg-secondary-100 text-secondary-70 py-2 px-6 border-[1px] hover:text-white uppercase'
              onClick={handleCancelClick}
            >
              Cancelar
            </Link>
            <button
              type='submit'
              className='bg-complementary-70 hover:bg-complementary-100 border-[1px] border-complementary-100 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline uppercase'
            >
              Guardar
            </button>
          </div>
        </form>
        <div className='mt-8 w-full flex justify-end'>
          <Modal
            isOpen={showModal}
            onCancel={handleCloseModal}
            text='cancelar'
            onConfirm={handleConfirm}
          />
          {successMessage && <AlertSuccess message={successMessage} />}
        </div>
      </div>
      <div className='fixed bottom-16 right-4 flex flex-col gap-4'>
        {CategoryErrors && CategoryErrors.length > 0 && (
          <>
            {CategoryErrors.map((error, index) => (
              <AlertDanger message={error} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
