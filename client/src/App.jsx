import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer, FootNav, Container } from './components/component.js';
import { useGetCartItemQuery, useGetCategoryQuery, useGetUserQuery, useGetProductsNameQuery } from './state/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setProductName } from './state/productSlice.js';
import { login, setCart, totalAmount } from './state/authSlice.js';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.authReducer.status);

  const { data: currentUser } = useGetUserQuery(null, {
    refetchOnMountOrArgChange: false,
  });
  const { data: productsName } = useGetProductsNameQuery();
  const { data: categories } = useGetCategoryQuery();
  const { data: cartItems } = useGetCartItemQuery(null, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (categories) {
      dispatch(setCategory(Array.from(categories.data)));
    }
    if (productsName) {
      dispatch(setProductName(productsName.data));
    }
  }, [categories, productsName, dispatch]);

  useEffect(() => {
    if (isLoggedIn && cartItems) {
      dispatch(setCart(cartItems.data));
      dispatch(totalAmount());
    }
  }, [cartItems, isLoggedIn, dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(login({ data: currentUser.data }));
    }
  }, [currentUser, dispatch]);

  return (
    <Container>
      <div className="relative min-h-screen max-w-[100%] md:w-[85%] mx-auto overflow-hidden">
        <FootNav />
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
}

export default App;
