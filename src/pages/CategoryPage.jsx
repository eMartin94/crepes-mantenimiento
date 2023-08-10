import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useCategory } from '../context/useCategory';
import CreateCategory from './Category/CreateCategory';
import UpdateCategory from './Category/UpdateCategory';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../components/modals/Modal';
import AlertSuccess from '../components/modals/AlertSuccess';

const CategoryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { getCategories, categories, deleteCategoryById, successMessage } = useCategory();
  const getCategoriesRef = useRef(getCategories);
  const [showCreate, setShowCreate] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [modalStates, setModalStates] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    getCategoriesRef.current();
  }, []);

  const handleConfirm = async (id) => {
    await deleteCategoryById(id);
    getCategoriesRef.current();
    handleCloseModal(id);
    setShowCreate(true);
    setShowUpdate(false);
  };

  const handleShowCreate = () => {
    setSelectedCategory(null);
    setShowCreate(true);
    setShowUpdate(false);
  };

  const handleShowUpdate = (category) => {
    setSelectedCategory(category);
    setShowCreate(false);
    setShowUpdate(true);
  };

  const handleDeleteClick = (id) => {
    setModalStates({ ...modalStates, [id]: true });
  };
  const handleCloseModal = (id) => {
    setModalStates({ ...modalStates, [id]: false });
  };

  if (categories.length === 0) {
    return <h1 className='py-24'>No hay categorias</h1>;
  }
  return (
    <div className='grid grid-cols-2 gap-4 py-8'>
      <div className='w-full flex flex-col gap-4 justify-center pt-2 '>
        <div className='flex flex-row justify-between px-4 py-2'>
          <h1 className='px-4 text-3xl text-complementary-100 font-bold uppercase'>
            Lista de Categorías
          </h1>
          <button
            className='bg-complementary-70 hover:bg-complementary-100 border-[1px] border-complementary-100 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline uppercase'
            onClick={handleShowCreate}
          >
            Crear nuevo
          </button>
        </div>
        <div className='flex flex-col w-full gap-2 px-4 py-2 justify-center'>
          {categories.map((item) => (
            <div
              key={item._id}
              className='flex flex-row justify-between bg-primary-10 gap-4 py-2 px-2 animate-zoom-in'
            >
              <p className='font-semibold capitalize text-complementary-100'>{item.nombre}</p>
              {isAuthenticated && user.role === 'administrator' && (
                <div className='flex flex-row justify-center items-center gap-4'>
                  <button
                    className='border-secondary-100 border-[1px] text-secondary-100 hover:bg-secondary-100 hover:text-white flex py-1 px-4 rounded max-h-8 justify-center items-center gap-2'
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    <FaTrash />
                  </button>
                  <Modal
                    isOpen={modalStates[item._id] || false}
                    onCancel={() => handleCloseModal(item._id)}
                    text='borrar el producto'
                    more='Se perderá información sencible y no podrá recuperarse'
                    onConfirm={() => handleConfirm(item._id)}
                  />

                  <button
                    className='border-complementary-100 border-[1px] text-complementary-100 hover:bg-complementary-100 hover:text-white flex py-1 px-4 rounded max-h-8 justify-center items-center gap-2'
                    onClick={() => handleShowUpdate(item)}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className='mt-8 w-full flex justify-end'>
            {successMessage && <AlertSuccess message={successMessage} />}
          </div>
        </div>
      </div>
      <div>
        {showCreate && <CreateCategory />}
        {showUpdate && (
          <UpdateCategory selectedCategory={selectedCategory} showUpdate={handleShowCreate} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
