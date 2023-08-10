import { useEffect, useRef } from 'react';
import { useCart } from '../context/useCart';
import { useProduct } from '../context/useProduct';
const ShoppingCart = () => {
  const { cart, getAllCarts } = useCart();
  const { products, getProductsAvailable } = useProduct();
  const getAllCartsRef = useRef(getAllCarts);
  const getProductsAvailableRef = useRef(getProductsAvailable);

  useEffect(() => {
    getAllCartsRef.current();
    getProductsAvailableRef.current();
  }, []);

  const productMap = new Map(
    products.map((item) => [item._id, { nombre: item.nombre, precio: item.precio }])
  );

  const userTotals = {};

  cart.forEach((cartItem) => {
    const userId = cartItem.user._id;
    if (!userTotals[userId]) {
      userTotals[userId] = { total: 0, itemCount: 0, productCount: 0 };
    }
    cartItem.items.forEach((item) => {
      if (productMap.has(item.product)) {
        userTotals[userId].total += productMap.get(item.product).precio * item.cantidad;
        userTotals[userId].itemCount += item.cantidad;
        userTotals[userId].productCount += 1;
      }
    });
  });

  let totalGeneral = 0;
  let totalItems = 0;

  Object.values(userTotals).forEach((userData) => {
    totalGeneral += userData.total;
    totalItems += userData.itemCount;
  });

  return (
    <div className='w-full flex flex-col gap-4 px-4 py-8'>
      <h1 className='text-4xl font-bold text-complementary-100 uppercase'>Pedidos</h1>
      <div className='flex flex-col gap-2 items-end mb-4'>
        <p>Total de Items: {totalItems}</p>
        <p>Total General: s/ {totalGeneral}</p>
      </div>
      <div className='flex flex-wrap w-full justify-center gap-4'>
        {cart.map((cartItem) => (
          <div
            key={cartItem._id}
            className='flex flex-col justify-between w-full max-w-xs rounded overflow-hidden bg-primary-10 animate-zoom-in'
          >
            <div className='bg-complementary-100 w-full px-4 py-2'>
              <strong className='uppercase w-full text-paragraph'>{cartItem.user.username}</strong>
            </div>
            <div className='flex-col px-4 py-2'>
              {cartItem.items.map((item, i) => (
                <div key={i} className='flex flex-col w-full mb-4'>
                  {productMap.has(item.product) ? (
                    <>
                      <div className='w-full pl-4 grid grid-cols-2'>
                        <h4 className='capitalize w-full font-semibold'>
                          {productMap.get(item.product).nombre}
                        </h4>
                        <div>
                          <div className='flex flex-row w-full justify-between text-xs'>
                            <label>Cantidad:</label>
                            <span className='font-semibold'>{item.cantidad} und</span>
                          </div>
                          <div className='flex flex-row w-full justify-between text-xs'>
                            <label>Precio:</label>
                            <span className='font-semibold'>
                              s/ {parseFloat(productMap.get(item.product).precio).toFixed(2)}
                            </span>
                          </div>
                          <div className='flex flex-row w-full justify-between text-xs'>
                            <label>Subtotal:</label>
                            <span className='font-semibold'>
                              s/{' '}
                              {parseFloat(
                                productMap.get(item.product).precio * item.cantidad
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className='w-full pl-4'>Producto no disponible</div>
                  )}
                </div>
              ))}
            </div>
            <div className='w-full px-4 py-2 bg-primary-30'>
              <div className='flex flex-row w-full justify-between text-sm'>
                <label>Total:</label>
                <span className='font-semibold'>
                  s/{' '}
                  {parseFloat(userTotals[cartItem.user._id]?.total).toFixed(2) ||
                    parseFloat(0).toFixed(2)}
                </span>
              </div>
              <div className='flex flex-row w-full justify-between text-sm'>
                <label>Cantidad Items:</label>
                <span className='font-semibold'>
                  {userTotals[cartItem.user._id]?.productCount || 0} und
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
