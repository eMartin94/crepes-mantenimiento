import { createContext, useEffect, useState } from 'react';
import { createUser, getUsers, updateUser } from '../api/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const getAllUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewUser = async (user) => {
    try {
      const res = await createUser(user);
      console.log(res);
      setUsers([...users, res.data]);
      if (res.status === 200) setSuccessMessage('¡Los datos se guardaron correctamente!');
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const updateUserById = async (id, role) => {
    try {
      const res = await updateUser(id, role);
      setUsers(users.map((user) => (user._id === role._id ? res.data : user)));
      if (res.status === 200) setSuccessMessage('¡Los datos se guardaron correctamente!');
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <UserContext.Provider
      value={{ users, getAllUsers, addNewUser, updateUserById, successMessage, errors }}
    >
      {children}
    </UserContext.Provider>
  );
};
