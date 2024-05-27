import { lazy } from 'react';

const Home = lazy(() => import('./Home/Home.jsx'));
const Cart = lazy(() => import('./Cart/Cart.jsx'));
const Account = lazy(() => import('./Profile/Account.jsx'));
const Search = lazy(() => import('./CheckProduct.jsx'));
const Login = lazy(() => import('./Login/Login.jsx'));
const AddProduct = lazy(() => import('./Dashboard/AddProduct.jsx'));
const Message = lazy(() => import('./Dashboard/Message.jsx'));
const AdminProduct = lazy(() => import('./Dashboard/AdminProduct.jsx'));
const Transaction = lazy(() => import('./Dashboard/Transaction.jsx'));
const Order = lazy(() => import('./Dashboard/Order.jsx'));
const Seller = lazy(() => import('./Dashboard/Seller.jsx'))
const Dashboard = lazy(() => import('./Dashboard/Dashboard.jsx'))

const Profile = lazy(() => import('./Profile/Profile.jsx'));
const Payment = lazy(() => import('./Profile/Payment.jsx'));
const Voucher = lazy(() => import('./Profile/Voucher.jsx'));
const MyOrder = lazy(() => import('./Profile/MyOrder.jsx'));
const ChangePassword = lazy(() => import('./Profile/ChangePassword.jsx'));
const ProductDetail = lazy(() => import('./Products/ProductDetail.jsx'));
const Categories = lazy(() => import('./Categories.jsx'));
const Agreement = lazy(() => import('./SellerAgreement/Agreement.jsx'));
const Error = lazy(() => import('../components/Error.jsx'));
const NewAddress = lazy(() => import('./Profile/NewAddress.jsx'));
export  {
    ChangePassword,
    MyOrder,
    NewAddress,
    Error,
    Agreement,
    Categories,
    ProductDetail,
    Voucher,
    Payment,
    Profile,
    Order,
    Seller,
    Dashboard,
    Transaction,
    Message,
    AdminProduct,
    AddProduct,
    Login,
    Home,
    Cart,
    Account,
    Search,
}