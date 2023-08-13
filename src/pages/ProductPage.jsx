import { useEffect, useState, useRef } from 'react';
import { useProduct } from '../context/useProduct';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/useAuth';
import AlertSuccess from '../components/modals/AlertSuccess';
import Modal from '../components/modals/Modal';

const ProductPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { getProducts, product, deleteProductById, successMessage, currentPage, totalPages } =
    useProduct();
  const getProductRef = useRef(getProducts);
  const [modalStates, setModalStates] = useState({});

  useEffect(() => {
    getProductRef.current();
  }, []);

  if (product.length === 0) {
    return <h1 className='py-24'>No hay productos</h1>;
  }

  const handleConfirm = async (id) => {
    await deleteProductById(id);
    getProductRef.current();
    handleCloseModal(id);
  };

  const handleDeleteClick = (id) => {
    setModalStates({ ...modalStates, [id]: true });
  };
  const handleCloseModal = (id) => {
    setModalStates({ ...modalStates, [id]: false });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      getProducts(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      getProducts(currentPage + 1);
    }
  };

  return (
    <div className='w-full flex flex-col gap-4 justify-center py-2'>
      <h1 className='px-4 text-3xl text-complementary-100 font-bold uppercase'>
        Lista de productos
      </h1>
      <div className='flex flex-col w-full gap-2 px-4 py-2 justify-center'>
        {product.map((item) => (
          <div
            key={item._id}
            className='flex flex-row bg-primary-10 gap-4 py-2 px-2 animate-zoom-in'
          >
            <div className='w-[100px] max-w-[100px] h-[60px] flex justify-center'>
              <img
                src={item.imagen.secure_url}
                alt={item.nombre}
                className='w-full max-w-[60px] h-full'
              />
            </div>
            <div className='flex flex-col w-full justify-center'>
              <h6 className='font-bold uppercase text-complementary-100'>{item.nombre}</h6>
              <p className='text-complementary-50'>{item.categoria}</p>
            </div>

            {isAuthenticated && user.role === 'administrator' && (
              <div className='flex flex-row justify-center items-center gap-4'>
                <button
                  className='border-secondary-100 border-[1px] text-secondary-100 hover:bg-secondary-100 hover:text-white flex py-1 px-4 rounded-[4px] max-h-8 justify-center items-center gap-2'
                  onClick={() => handleDeleteClick(item._id)}
                >
                  <FaTrash />
                  Borrar
                </button>
                <Modal
                  isOpen={modalStates[item._id] || false}
                  onCancel={() => handleCloseModal(item._id)}
                  text='borrar el producto'
                  more='Se perderá información sencible y no podrá recuperarse'
                  onConfirm={() => handleConfirm(item._id)}
                />

                <Link
                  to={`/product/update/${item._id}`}
                  className='border-complementary-100 border-[1px] text-complementary-100 hover:bg-complementary-100 hover:text-white flex py-1 px-4 rounded-[4px] max-h-8 justify-center items-center gap-2'
                >
                  <FaEdit />
                  Editar
                </Link>
              </div>
            )}
          </div>
        ))}
        <div className='mt-8 w-full flex justify-end'>
          {successMessage && <AlertSuccess message={successMessage} />}
        </div>
        <div className='mt-4 flex justify-center items-center'>
          <button
            className='bg-complementary-70 disabled:bg-complementary-70 hover:bg-complementary-100 text-white px-4 py-2 rounded'
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className='mx-4'>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className='bg-complementary-70 disabled:bg-complementary-70 hover:bg-complementary-100 text-white px-4 py-2 rounded'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
