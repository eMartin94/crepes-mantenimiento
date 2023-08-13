import { createContext, useState } from 'react';
import { getOrders } from '../api/order';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return <OrderContext.Provider value={{ orders, getAllOrders }}>{children}</OrderContext.Provider>;
};
