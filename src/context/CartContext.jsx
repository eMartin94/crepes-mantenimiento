import { createContext, useState } from 'react';
import { getCarts } from '../api/cart';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getAllCarts = async () => {
    try {
      const res = await getCarts();
      setCart(res.data.carts);
    } catch (error) {
      console.log(error);
    }
  };

  return <CartContext.Provider value={{ cart, getAllCarts }}>{children}</CartContext.Provider>;
};
