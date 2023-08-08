import { FaBox, FaHome, FaPlusSquare, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Sidebar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <div className='hidden w-[60px] md:w-[250px] h-screen bg-primary-10 sm:flex flex-col justify-between fixed'>
      <div className='w-full py-4 flex justify-center'>
        <h1 className='text-xl font-bold text-primary-100'>Logo Crepes</h1>
      </div>
      <div className='w-full h-full border-y-2'>
        <ul className='w-full'>
          <li className='bg-primary-70 hover:bg-primary-100 justify-center items-center text-paragraph'>
            <Link to='/' className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'>
              <FaHome className='text-xl' />
              <span className='hidden md:block'>Home</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li className='bg-primary-70 hover:bg-primary-100 justify-center items-center text-paragraph'>
              <Link
                to={isAuthenticated ? '/product' : '/'}
                className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
              >
                <FaBox className='text-xl' />
                <span className='hidden md:block'>Productos</span>
              </Link>
            </li>
          )}
          {isAuthenticated && user.role === 'administrator' && (
            <>
              <li className='bg-primary-70 hover:bg-primary-100 justify-center items-center text-paragraph'>
                <Link
                  to='/product/create'
                  className='pl-4 md:pl-8 pr-4 w-full flex flex-row gap-2 py-2 items-center'
                >
                  <FaPlusSquare className='text-xl' />
                  <span className='hidden md:block'>Crear Producto</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-between pl-8 pr-4 items-center py-2 gap-4'>
        {isAuthenticated ? (
          <>
            <strong>{user.username}</strong>
            <Link to='/' onClick={() => logout()}>
              <FaSignOutAlt />
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
