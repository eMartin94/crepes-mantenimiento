import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <CategoryProvider>
            <CartProvider>
              <OrderProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </OrderProvider>
            </CartProvider>
          </CategoryProvider>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
