import { useEffect, useRef, useState } from 'react';
import UserUpdate from './user/UserUpdate';
import UserCreate from './user/UserCreate';
import { useUser } from '../context/useUser';
import { FaEdit } from 'react-icons/fa';

const UserPage = () => {
  const { users, getAllUsers } = useUser();
  const [showCreate, setShowCreate] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const getUserRef = useRef(getAllUsers);
  useEffect(() => {
    getUserRef.current();
  }, []);

  const handleShowCreate = () => {
    setSelectedUser(null);
    setShowCreate(true);
    setShowUpdate(false);
  };

  const handleShowUpdate = (user) => {
    setSelectedUser(user);
    setShowCreate(false);
    setShowUpdate(true);
  };

  if (users.length === 0) {
    return <h1 className='py-24'>No hay usuarios registrados</h1>;
  }

  return (
    <div className='grid grid-cols-2 gap-4 py-2'>
      <div className='w-full flex flex-col gap-4 justify-start pt-2'>
        <div className='flex flex-row justify-between px-4 py-2'>
          <h1 className='text-3xl text-complementary-100 font-bold uppercase'>Lista de usuario</h1>
          <button
            className='bg-complementary-70 hover:bg-complementary-100 border-[1px] border-complementary-100 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline uppercase'
            onClick={handleShowCreate}
          >
            Crear nuevo
          </button>
        </div>
        <div className='flex flex-col w-full gap-2 px-4 py-2 justify-center box-usuarios overflow-y-auto max-h-[calc(100vh-20px)]'>
          {users.map((user, index) => (
            <div
              key={user._id}
              className={`flex flex-row justify-between bg-primary-10 gap-4 py-2 px-2 animate-zoom-in ${
                index === 0 ? 'mt-2' : ''
              }`}
            >
              <div>
                <h4 className='text-complementary-100 font-semibold capitalize'>{user.username}</h4>
                <p className='text-complementary-70 text-xs'>{user.role}</p>
              </div>
              <button
                className='border-complementary-100 border-[1px] text-complementary-100 hover:bg-complementary-100 hover:text-white flex py-1 px-4 rounded max-h-8 justify-center items-center gap-2'
                onClick={() => handleShowUpdate(user)}
              >
                <FaEdit />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        {showCreate && <UserCreate />}
        {showUpdate && <UserUpdate selectedUser={selectedUser} showUpdate={handleShowCreate} />}
      </div>
    </div>
  );
};

export default UserPage;
