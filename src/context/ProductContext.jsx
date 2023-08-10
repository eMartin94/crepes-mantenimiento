import { createContext, useEffect, useState } from 'react';
import {
  addProduct,
  getProduct,
  getProductAvailable,
  updateProduct,
  deleteProduct,
  // getProductAvaliable,
} from '../api/product';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;

  const getProducts = async (page = 1) => {
    try {
      const res = await getProduct(page, productsPerPage);
      setProduct(res.data.docs);
      setTotalPages(res.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      // console.log(error.response.data.error);
    }
  };

  const getProductsAvailable = async () => {
    try {
      const res = await getProductAvailable();
      setProducts(res.data);
    } catch (error) {
      // console.log(error.response.data.error);
    }
  };

  const createProduct = async (productData) => {
    try {
      const formData = new FormData();
      formData.append('nombre', productData.nombre);
      formData.append('descripcion', productData.descripcion);
      formData.append('precio', parseFloat(productData.precio));
      formData.append('ingredientes', productData.ingredientes.toString());
      formData.append('categoria', productData.categoria);
      formData.append('subcategoria', productData.subcategoria);
      formData.append('disponible', productData.disponible);
      if (productData.imagen[0]) formData.append('image', productData.imagen[0]);
      const res = await addProduct(formData);
      // console.log(res);
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

  const updateProductById = async (id, productData) => {
    try {
      const formData = new FormData();
      formData.append('nombre', productData.nombre);
      formData.append('descripcion', productData.descripcion);
      formData.append('precio', parseFloat(productData.precio));
      formData.append('ingredientes', productData.ingredientes.toString());
      formData.append('categoria', productData.categoria);
      formData.append('subcategoria', productData.subcategoria);
      formData.append('disponible', productData.disponible);
      if (productData.imagen[0]) formData.append('image', productData.imagen[0]);
      const res = await updateProduct(id, formData);
      // console.log(res);
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

  const deleteProductById = async (id) => {
    try {
      const res = await deleteProduct(id);
      console.log(res);
      if (res.status === 200) setSuccessMessage('¡Los datos se eliminaron correctamente!');
    } catch (error) {
      // console.log(error.response.data);
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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <ProductContext.Provider
      value={{
        product,
        getProducts,
        createProduct,
        updateProductById,
        deleteProductById,
        errors,
        products,
        getProductsAvailable,
        successMessage,
        currentPage,
        totalPages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
