import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/useAuth';

const SellerProtectedRoutes = () => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  if (isAuthenticated && user.role !== 'seller' && user.role !== 'administrator') {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

export default SellerProtectedRoutes;
