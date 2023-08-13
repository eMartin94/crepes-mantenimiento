import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import ProtectedRoutes from './ProtectedRoutes';
import CreateProduct from './pages/Product/CreateProduct';
import UpdateProduct from './pages/Product/UpdateProduct';
import AdminProtectedRoutes from './AdminProtectedRoutes';
import Sidebar from './components/Sidebar';
import CategoryPage from './pages/CategoryPage';
import ShoppingCart from './pages/ShoppingCart';
import UserPage from './pages/UserPage';
import SellerProtectedRoutes from './SellerProtectedRoutes';
import OrderPage from './pages/OrderPage';

export default function App() {
  return (
    <div className='w-full h-full min-h-screen bg-cover bg-no-repeat bg-center relative flex'>
      {/* <Navbar /> */}
      <header className='flex h-10'>
        <Sidebar />
      </header>
      <main className='min-w-[calc(100%-250px)] h-full ml:0 sm:ml-[60px] md:ml-[250px] w-full'>
        <section className='w-full h-full min-h-[calc(100vh-50px)] px-8 py-3 flex flex-col gap-4'>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/product' element={<ProductPage />} />
              <Route path='/category' element={<CategoryPage />} />
              <Route path='/cart' element={<ShoppingCart />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
            <Route element={<AdminProtectedRoutes />}>
              <Route path='/user' element={<UserPage />} />
              <Route path='/product/create' element={<CreateProduct />} />
              <Route path='/product/update/:productId' element={<UpdateProduct />} />
            </Route>
            <Route element={<SellerProtectedRoutes />}>
              <Route path='/order' element={<OrderPage />} />
            </Route>
          </Routes>
        </section>
      </main>
    </div>
  );
}
