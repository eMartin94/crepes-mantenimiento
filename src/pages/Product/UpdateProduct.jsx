import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../../context/useProduct';
import { FaWindowClose } from 'react-icons/fa';
import InputFile from '../../components/forms/InputFile';
import Input from '../../components/forms/Input';
import Modal from '../../components/modals/Modal';
import AlertSuccess from '../../components/modals/AlertSuccess';
import AlertDanger from '../../components/modals/AlertDanger';
import SelectCategory from '../../components/forms/SelectCategory';

const UpdateProduct = () => {
  const { productId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { product, updateProductById, errors: ProductErrors, successMessage } = useProduct();
  const [ingredientList, setIngredientList] = useState([]);
  const [isDisponible, setIsDisponible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isImagen, setIsImagen] = useState([]);
  const [categorias, setCategorias] = useState('');
  const [categoriaError, setCategoriaError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleDisponibleChange = (e) => {
    setIsDisponible(e.target.checked);
  };

  useEffect(() => {
    if (product && product.length > 0) {
      const selectedProduct = product.find((item) => item._id === productId);
      if (selectedProduct) {
        const {
          nombre,
          descripcion,
          precio,
          ingredientes,
          imagen,
          categoria,
          subcategoria,
          disponible,
        } = selectedProduct;
        setValue('nombre', nombre);
        setValue('descripcion', descripcion);
        setValue('precio', precio);
        setValue('ingredientes', ingredientes);
        setValue('imagen', imagen);
        setValue('categoria', categoria);
        setValue('subcategoria', subcategoria);
        setValue('disponible', disponible);
        setIsLoading(false);
        setIsImagen(imagen.secure_url);
        setIngredientList(ingredientes);
        setIsDisponible(disponible);
        setCategorias(selectedProduct.categoria);
      }
    }
  }, [product, productId, setValue]);

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
    if (!categorias === 'Seleccionar categoría') {
      setCategoriaError('El campo categoría es requerido');
      return;
    }
    data.categoria = categorias;
    try {
      await updateProductById(productId, data);
      setRedirecting(true);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    reset();
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

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const handleConfirm = () => {
    navigate('/product');
    reset();
  };

  const handleCancelClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex flex-wrap justify-center py-2 animate-zoom-in'>
      <div className='bg-primary-10 shadow-md rounded px-8 pt-2 w-full'>
        <h4 className='text-2xl font-bold mb-4 uppercase text-complementary-100'>
          editar producto
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 border-b-[2px] border-primary-30 py-2'>
            <div className='px-4'>
              {/* Product Name */}
              <Input
                label='Nombre de Producto'
                name='nombre'
                register={register}
                errors={errors}
                isRequired={true}
                defaultValue={getValues('nombre')}
                setValue={setValue}
                className='capitalize'
              />
              {/* Product Description */}
              <Input
                label='Descripción'
                name='descripcion'
                register={register}
                errors={errors}
                isRequired={true}
                defaultValue={getValues('descripcion')}
                setValue={setValue}
              />
              {/* Product Price */}
              <Input
                type='number'
                label='Precio'
                name='precio'
                register={register}
                errors={errors}
                isRequired={true}
                defaultValue={getValues('precio')}
                setValue={setValue}
              />
              {/* Ingredient Input */}
              <Input
                label='Ingredientes'
                name='ingredientes'
                register={register}
                errors={errors}
                isRequired={false}
                onKeyDown={agregarIngrediente}
                // value={currentIngredient}
                defaultValue={getValues('ingredientes')}
                setValue={setValue}
              />
              {/* Lista de ingredientes en forma de burbujas */}
              <div className='mb-4'>
                {product &&
                  ingredientList.map((ingrediente, index) => (
                    <div key={index} className='inline-block m-1'>
                      <div className='px-3 py-2 bg-primary-50 text-white rounded-lg flex items-center'>
                        <span className='mr-2'>{ingrediente}</span>
                        <button
                          type='button'
                          onClick={() => eliminarIngrediente(index)}
                          className='flex items-center justify-center w-[20px] h-[20px] overflow-hidden'
                        >
                          <FaWindowClose className='text-white hover:text-complementary-50' />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Product Category */}

              {/* <Input
                label='Categoria'
                name='categoria'
                register={register}
                errors={errors}
                isRequired={true}
                defaultValue={getValues('categoria')}
              /> */}

              <SelectCategory
                value={categorias}
                onChange={(e) => {
                  setCategorias(e.target.value);
                  setCategoriaError('');
                }}
                error={categoriaError}
              />
              {/* Product Subcategory */}

              <Input
                label='Subcategoria'
                name='subcategoria'
                register={register}
                errors={errors}
                isRequired={true}
                defaultValue={getValues('subcategoria')}
                setValue={setValue}
                className='capitalize'
              />
              {/* Product Availability */}
              <div className='mb-4'>
                <label className='text-primary-100 uppercase tracking-wider text-sm md:text-base'>
                  Disponible:
                </label>
                <input
                  type='checkbox'
                  name='disponible'
                  {...register('disponible')}
                  onChange={handleDisponibleChange}
                  defaultChecked={isDisponible}
                  className='ml-2 leading-tight text-primary-100'
                />
              </div>
            </div>

            <div className='flex flex-col px-4'>
              {/* Product image */}
              <InputFile
                label='Selecciona una imagen'
                name='imagen'
                register={register}
                errors={errors}
                isRequired={true}
                preview={true}
                defaultValue={isImagen}
              />
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
            {/* Submit button */}
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

export default UpdateProduct;
