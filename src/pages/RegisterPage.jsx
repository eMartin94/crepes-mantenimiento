import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import Input from '../components/forms/Input';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (value) => {
    signup(value);
  });

  return (
    <div className=' w-full min-h-screen flex flex-col gap-4 justify-center items-center max-w-7xl mx-auto'>
      <div className='grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-4 p-4 md:px-8 md:py-16 w-full md:w-[80%] h-full min-h-[70vh] bg-opacity-0 md:bg-purple-300 md:bg-opacity-50 md:shadow-[0_4px_8px_rgba(0,0,0,0.2)]'>
        <div className='hidden lg:block'>
          <img src='../src/assets/undraw_enter_uhqk.svg' alt='image' />
        </div>
        <div className='relative w-full max-w-md flex flex-col h-full bg-white shadow-[0_8px_16px_rgba(0,0,0,0.2)] mx-auto'>
          <div className='flex flex-col md:flex-row gap-4 justify-between items-center px-4 md:px-8 py-5 shadow-[0_4px_8px_rgba(0,0,0,0.2)]'>
            <h2 className='w-full min-w-[220px] flex justify-start font-bold uppercase text-xl text-gray-600 tracking-wider'>
              crear una cuenta
            </h2>
            <div className='w-full flex justify-end gap-2 text-[rgba(111,97,192,1)]'>
              <FaRegUser />
              <Link to='/login' className='text-[rgba(111,97,192,1)] font-semibold text-xs'>
                Sign in
              </Link>
            </div>
          </div>
          {RegisterErrors.length > 0 && (
            <div className='absolute md:top-[70px] top-28 w-full flex flex-col justify-center mt-2 text-sm transition-all ease-linear'>
              {RegisterErrors.map((error, index) => (
                <p key={index} className='text-red-600 text-center'>
                  {error}
                </p>
              ))}
            </div>
          )}
          <form
            onSubmit={onSubmit}
            className='flex flex-col justify-around gap-4 w-full h-full md:px-8 py-8 px-4'
          >
            <div className='flex flex-col gap-2 md:px-4 px-2'>
              <Input
                type={'text'}
                label={'Nombre de usuario'}
                name={'username'}
                register={register}
                errors={errors}
              />
              <Input
                type={'email'}
                label={'Correo electrónico'}
                name={'email'}
                register={register}
                errors={errors}
                isRequired={true}
              />
              <Input
                type={'password'}
                label={'Contraseña'}
                name={'password'}
                register={register}
                errors={errors}
                isRequired={true}
              />
            </div>
            <button
              type='submit'
              className='bg-[rgba(111,97,192,1)] px-4 py-4 text-white font-bold hover:bg-[rgba(111,97,192,0.8)] uppercase'
            >
              crear cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
