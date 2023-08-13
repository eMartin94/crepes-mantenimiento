import {
  FaBox,
  FaCartArrowDown,
  FaFolderPlus,
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaUserCircle,
  FaUserEdit,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useState } from 'react';

const Sidebar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className='hidden w-[60px] md:w-[250px] h-screen bg-primary-10 sm:flex flex-col justify-between fixed'>
      <div className='w-full py-4 pl-4 flex justify-start'>
        <h1 className='text-xl font-bold text-complementary-100'>Logo Crepes</h1>
      </div>
      <div className='w-full h-full border-y-2'>
        <ul className='w-full flex flex-col gap-1'>
          <li
            className={`${
              activeItem === 'home' ? 'bg-complementary-100 text-paragraph' : ''
            } hover:bg-complementary-100 justify-center items-center text-complementary-100 hover:text-paragraph transition-all duration-300 ease-in-out`}
          >
            <Link
              to='/'
              className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
              onClick={() => handleItemClick('home')}
            >
              <FaHome className='text-xl' />
              <span className='hidden md:block'>Home</span>
            </Link>
          </li>

          {isAuthenticated && user.role === 'administrator' && (
            <>
              <li
                className={`${
                  activeItem === 'admin' ? 'bg-complementary-100 text-paragraph' : ''
                } hover:bg-complementary-100 justify-center items-center text-complementary-100 hover:text-paragraph transition-all duration-300 ease-in-out`}
              >
                <Link
                  to='/user'
                  className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
                  onClick={() => handleItemClick('admin')}
                >
                  <FaUserEdit className='text-xl' />
                  <span className='hidden md:block'>Administrar usuario</span>
                </Link>
              </li>
              <li
                className={`${
                  activeItem === 'create' ? 'bg-complementary-100 text-paragraph' : ''
                } hover:bg-complementary-100 justify-center items-center text-complementary-100 hover:text-paragraph transition-all duration-300 ease-in-out`}
              >
                <Link
                  to='/product/create'
                  className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
                  onClick={() => handleItemClick('create')}
                >
                  <FaFolderPlus className='text-xl' />
                  <span className='hidden md:block'>Crear Producto</span>
                </Link>
              </li>
              <li
                className={`${
                  activeItem === 'categories' ? 'bg-complementary-100 text-paragraph' : ''
                } hover:bg-complementary-100 justify-center items-center text-complementary-100 hover:text-paragraph transition-all duration-300 ease-in-out`}
              >
                <Link
                  to='/category'
                  className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
                  onClick={() => handleItemClick('categories')}
                >
                  <FaPlusCircle className='text-xl' />
                  <span className='hidden md:block'>Categorías</span>
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (user.role === 'administrator' || user.role === 'seller') && (
            <>
              <li
                className={`${
                  activeItem === 'product' ? 'bg-complementary-100 text-paragraph' : ''
                } hover:bg-complementary-100 justify-center items-center text-complementary-100 hover:text-paragraph`}
              >
                <Link
                  to={isAuthenticated ? '/product' : '/'}
                  className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
                  onClick={() => handleItemClick('product')}
                >
                  <FaBox className='text-xl' />
                  <span className='hidden md:block'>Productos</span>
                </Link>
              </li>
              <li
                className={`${
                  activeItem === 'order' ? 'bg-complementary-100 text-paragraph' : ''
                } hover:bg-complementary-100 justify-center items-center text-complementary-100 hover:text-paragraph`}
              >
                <Link
                  to={isAuthenticated ? '/order' : '/'}
                  className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
                  onClick={() => handleItemClick('order')}
                >
                  <FaCartArrowDown className='text-xl' />
                  <span className='hidden md:block'>Pedidos</span>
                </Link>
              </li>
              <li
                className={`${
                  activeItem === 'cart' ? 'bg-complementary-100 text-paragraph' : ''
                } hover:bg-complementary-100 justify-center items-center text-complementary-100 hover:text-paragraph`}
              >
                <Link
                  to={isAuthenticated ? '/cart' : '/'}
                  className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
                  onClick={() => handleItemClick('cart')}
                >
                  <FaCartArrowDown className='text-xl' />
                  <span className='hidden md:block'>Pedidos</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-between px-4 items-center py-4 gap-4'>
        {isAuthenticated ? (
          <>
            <div className='flex flex-row gap-2 items-center'>
              <FaUserCircle className='text-complementary-100 text-2xl' />
              <strong className='text-complementary-100 capitalize'>{user.username}</strong>
            </div>
            <Link to='/' onClick={() => logout()}>
              <FaSignOutAlt className='text-complementary-100 text-xl' />
            </Link>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
