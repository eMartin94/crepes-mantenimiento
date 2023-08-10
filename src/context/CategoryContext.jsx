import { createContext, useEffect, useState } from 'react';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../api/category';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  // console.log(categories);
  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const addNewCategory = async (category) => {
    try {
      const res = await addCategory(category);
      setCategories([...categories, res.data]);
      if (res.status === 200) setSuccessMessage('¡Los datos se guardaron correctamente!');
    } catch (error) {
      // console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      setSuccessMessage('');
    }
  };
  const updateCategoryById = async (id, category) => {
    try {
      const res = await updateCategory(id, category);
      setCategories(categories.map((c) => (c._id === category._id ? res.data : c)));
    } catch (error) {
      console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      setSuccessMessage('');
    }
  };

  const deleteCategoryById = async (id) => {
    try {
      const res = await deleteCategory(id);
      setCategories(categories.filter((c) => c._id !== id));
      if (res.status === 200) setSuccessMessage('¡Los datos se eliminaron correctamente!');
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      setSuccessMessage('');
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
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        addNewCategory,
        updateCategoryById,
        deleteCategoryById,
        successMessage,
        errors,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
