import { useEffect, useRef } from 'react';
import { useOrder } from '../context/useOrder';
import { format } from 'date-fns';

const OrderPage = () => {
  const { orders, getAllOrders } = useOrder();
  const getAllOrdersRef = useRef(getAllOrders);
  useEffect(() => {
    getAllOrdersRef.current();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  return (
    <div className='min-h-screen bg-primary-10 py-8'>
      <div className='w-full px-4'>
        <h1 className='text-2xl font-bold mb-4'>Órdenes de Compra</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className='bg-white p-6 rounded shadow-md border-t-8 border-primary-100 w-full'
              >
                <h2 className='text-lg font-semibold mb-2'>Nro Orden: {order.nroOrder}</h2>
                <p>
                  <span className='font-semibold'>Usuario:</span> {order.user.username}
                </p>
                <p>
                  <span className='font-semibold'>Total:</span> s/{' '}
                  {parseFloat(order.totalAmount).toFixed(2)}
                </p>
                <p>
                  <span className='font-semibold'>Estado:</span> {order.status}
                </p>
                <p>
                  <span className='font-semibold'>Creado en:</span> {formatDate(order.createdAt)}
                </p>
                <div className='mt-4 space-y-2'>
                  {order.items.map((item) => (
                    <div key={item._id} className='flex flex-row w-full gap-4 items-center'>
                      <img
                        src={item.product.imagen.secure_url}
                        alt={item.product.nombre}
                        className='w-12 h-12 object-cover rounded'
                      />
                      <div>
                        <p className='font-semibold'> {item.product.nombre}</p>
                        <p>Precio: s/ {parseFloat(item.product.precio).toFixed(2)}</p>
                        <p>Cantidad: {item.quantity}</p>
                      </div>

                      {/* Puedes mostrar más detalles del producto aquí */}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No hay órdenes disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
