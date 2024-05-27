import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  Order,
  Home,
  Cart,
  Account,
  Search,
  Categories,
  Login,
  AddProduct,
  AdminProduct,
  Message,
  Transaction,
  Profile,
  Voucher,
  ProductDetail,
  Agreement,
  Error,
  NewAddress,
  MyOrder,
  ChangePassword,
  Seller,
  Dashboard
} from "./pages/index.js"

import "./index.css";
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux';
import { store, persistor } from './state/store.js';
import NotFount from './components/NotFount.jsx';
import { PersistGate } from 'redux-persist/integration/react';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route path='' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='cart' element={<Cart />} />
      <Route path='login' element={<Login />} />
      <Route path='become-seller-terms' element={<Agreement />} />
      <Route path='categories' element={<Categories />}>
        {/* <Route path='/' /> */}
      </Route>
      <Route path='account/' element={<Account />}>
        <Route path='new-address' element={<NewAddress />} />
        <Route path='profile/'>
          <Route path='' element={<Profile />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Route>
        <Route path='orders' element={<MyOrder />} />
        <Route path='voucher' element={<Voucher />} />
      </Route>
      <Route path='products/'>
        <Route path=':productId' element={<ProductDetail />} />
      </Route>
    </Route>
    <Route path='search' element={<Search />} />
    <Route path='seller/' element={<Seller />}>
      <Route path='dashboard' element={<Dashboard/>}  />
      <Route path='add-product' element={<AddProduct />} />
      <Route path='update-product' element={<AddProduct />} />
      <Route path='your-products' element={<AdminProduct />} />
      <Route path='messages' element={<Message />} />
      <Route path='transcations' element={<Transaction />} />
      <Route path='orders' element={<Order />} />
    </Route>
    <Route path='*' element={<NotFount />} />
    <Route path='error' element={<Error />} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </PersistGate>
  </Provider>
)
