import { useEffect, useState } from 'react';
import { useUser } from '../../context/useUser';
import { useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import { Link } from 'react-router-dom';
import Modal from '../../components/modals/Modal';
import AlertSuccess from '../../components/modals/AlertSuccess';
import AlertDanger from '../../components/modals/AlertDanger';

const UserCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { addNewUser, successMessage, errors: UserErrors } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [role, setRole] = useState('Seleccionar categoría');

  const onSubmit = async (data) => {
    data.role = role;
    try {
      await addNewUser(data);
      setRole('Seleccionar categoría');
      setRedirecting(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (successMessage && redirecting) {
      const redirectTimeout = setTimeout(() => {
        reset();
        setRedirecting(false);
      }, 100);

      return () => clearTimeout(redirectTimeout);
    }
  }, [successMessage, redirecting, reset]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
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
        <h4 className='text-2xl font-bold mb-4 uppercase text-complementary-100'>Nuevo Usuario</h4>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Input
            type='text'
            label='Nombre de usuario'
            name='username'
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <Input
            type='email'
            label='Correo electrónico'
            name='email'
            register={register}
            errors={errors}
            isRequired={true}
            setValue={setValue}
          />
          <Input
            type='password'
            label='Contraseña'
            name={'password'}
            register={register}
            errors={errors}
            isRequired={true}
            setValue={setValue}
          />
          {/* <Input
            type='text'
            label='Rol de usuario'
            name='role'
            register={register}
            errors={errors}
            setValue={setValue}
          /> */}
          <div className='relative inline-block w-full mt-4'>
            <select
              value={role}
              onChange={handleRoleChange}
              className='block appearance-none w-full bg-transparent border border-primary-50 hover:border-primary-50 text-complementary-100 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline capitalize'
            >
              <option value='Seleccionar categoría' disabled>
                Seleccionar Rol
              </option>
              <option value='customer'>Cliente</option>
              <option value='administrator'>Administrador</option>
              <option value='seller'>Vendedor</option>
              <option value='delivery'>Delivery</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <svg
                className='w-5 h-5 text-primary-100'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                ></path>
              </svg>
            </div>
          </div>
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
        {UserErrors && UserErrors.length > 0 && (
          <>
            {UserErrors.map((error, index) => (
              <AlertDanger message={error} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserCreate;
