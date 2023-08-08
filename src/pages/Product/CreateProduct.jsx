import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import TextArea from '../../components/forms/TextArea';
import { FaWindowClose } from 'react-icons/fa';
import InputFile from '../../components/forms/InputFile';
import { useProduct } from '../../context/useProduct';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/modals/Modal';
import AlertSuccess from '../../components/modals/AlertSuccess';
import AlertDanger from '../../components/modals/AlertDanger';

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { createProduct, errors: ProductErrors, successMessage } = useProduct();

  const [ingredientList, setIngredientList] = useState([]);
  const [isDisponible, setIsDisponible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState('Seleccionar categoría');
  const [categoriaError, setCategoriaError] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (successMessage && redirecting) {
      const redirectTimeout = setTimeout(() => {
        navigate('/product');
        setRedirecting(false);
      }, 100);

      return () => clearTimeout(redirectTimeout);
    }
  }, [successMessage, redirecting, navigate]);

  const onSubmit = async (data) => {
    data.nombre = data.nombre.toLowerCase();
    data.precio = parseFloat(data.precio);
    data.ingredientes = ingredientList.toString();
    data.disponible = isDisponible;
    if (categorias === 'Seleccionar categoría') {
      setCategoriaError('El campo categoría es requerido');
      return;
    }
    data.categoria = categorias;

    try {
      await createProduct(data);
      setRedirecting(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisponibleChange = (e) => {
    setIsDisponible(e.target.checked);
  };

  const agregarIngrediente = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setIngredientList([...ingredientList, e.target.value]);
      reset({ ingredientes: '' });
    }
  };

  const eliminarIngrediente = (index) => {
    const nuevosIngredientes = [...ingredientList];
    nuevosIngredientes.splice(index, 1);
    setIngredientList(nuevosIngredientes);
  };

  const handleConfirm = () => {
    window.location.href = '/product';
  };

  const handleCancelClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex flex-wrap justify-center pt-2'>
      <div className='bg-primary-10 shadow-md rounded px-8 pt-6 pb-8 w-full'>
        <h4 className='text-2xl font-bold mb-4 uppercase text-complementary-100'>crear producto</h4>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 border-b-[2px] border-primary-30 py-2'>
            {/* Product Name */}
            <div className='px-4'>
              <Input
                type='text'
                label='nombre de producto'
                name='nombre'
                register={register}
                errors={errors}
                isRequired={true}
              />
              {/* Product Description */}
              <TextArea
                label='descripción del producto'
                name='descripcion'
                register={register}
                errors={errors}
              />
              {/* Product Price */}
              <Input
                type='number'
                label='precio del producto'
                name='precio'
                register={register}
                errors={errors}
                isRequired={true}
              />
              {/* Ingredient Input */}
              <Input
                type='text'
                label='Ingredientes'
                name='ingredientes'
                register={register}
                errors={errors}
                isRequired={false}
                onKeyDown={agregarIngrediente}
              />
              {/* Lista de ingredientes en forma de burbujas */}
              <div className='mb-4'>
                {ingredientList.map((ingrediente, index) => (
                  <div key={index} className='inline-block m-1'>
                    <div className='px-3 py-2 bg-complementary-30 text-complementary-100 rounded-lg flex items-center'>
                      <span className='mr-2 text-sm lowercase'>{ingrediente}</span>
                      <button
                        type='button'
                        onClick={() => eliminarIngrediente(index)}
                        className='flex items-center justify-center w-[20px] h-[20px] overflow-hidden'
                      >
                        <FaWindowClose className=' text-white hover:text-complementary-50' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Product Category */}
              {/* <Input
                type='text'
                label='categoria'
                name='categoria'
                register={register}
                errors={errors}
                isRequired={true}
              /> */}
              <div className='relative inline-block w-full'>
                <select
                  {...register('categoria', { required: true })}
                  value={categorias}
                  onChange={(e) => {
                    setCategorias(e.target.value);
                    setCategoriaError('');
                  }}
                  className='block appearance-none w-full bg-transparent border border-primary-50 hover:border-primary-50 text-primary-100 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                >
                  <option value='Seleccionar categoría' disabled>
                    Seleccionar categoría
                  </option>
                  <option value='crepes'>Crepes</option>
                  <option value='waffles'>Waffles</option>
                  <option value='bebidas'>Bebidas</option>
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

              {categoriaError && (
                <span className='text-red-500 text-xs italic'>{categoriaError}</span>
              )}

              {/* Product Subcategory */}
              <Input
                type='text'
                label='subcategoria'
                name='subcategoria'
                register={register}
                errors={errors}
                isRequired={false}
              />
              {/* Product Availability */}
              <div className='my-4'>
                <label className='text-primary-100 uppercase tracking-wider text-sm md:text-base'>
                  Disponible:
                  <input
                    type='checkbox'
                    name='disponible'
                    // {...register('disponible')}
                    {...register('disponible', { value: isDisponible })}
                    checked={isDisponible}
                    onChange={handleDisponibleChange}
                    className='ml-2 leading-tight text-primary-100'
                  />
                </label>
              </div>
            </div>

            <div className='flex flex-col px-4'>
              <div className='flex-col gap-4 mt-4'>
                {/* Product Image */}
                <InputFile
                  label='imagen del producto'
                  name='imagen'
                  register={register}
                  errors={errors}
                  isRequired={true}
                  accept={'image/*'}
                  preview
                />
              </div>
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
        {ProductErrors && ProductErrors.length > 0 && (
          <>
            {ProductErrors.map((error, index) => (
              <AlertDanger message={error} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
