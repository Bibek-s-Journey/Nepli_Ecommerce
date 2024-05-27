import React from 'react'
import { useSelector,useDispatch } from "react-redux"
import Input from '../../components/Input';
import Button from '../../components/Button';
import { MdDelete } from "react-icons/md";
import { removeCartItem } from '../../state/authSlice';
import { useUpdateCartItemMutation,useMakePaymentMutation } from '../../state/api';
import { showToast } from '../../state/utilSlice';
import { Navigate } from 'react-router-dom';

import {Payment} from "../../components/Payment/Payment.jsx"



function Cart() {
  const isLogged = useSelector(state => state.authReducer.status);

  if (!isLogged) {
    return <Navigate to="/login"/>
  }
  
  const [updateCart] = useUpdateCartItemMutation();
  const [checkout] = useMakePaymentMutation();
  const dispatch = useDispatch();
  
  const cartProducts = useSelector(state => state.authReducer.cartItem);
  const cartTotal = useSelector(state => state.authReducer.cartTotal);
  const orderSummary = [
    {
      title: "Subtotal",
      price: `${cartTotal}`
    },
    {
      title: "Shipping estimate",
      icon: "",
      price: 0,

    },
    {
      title: "Tax estimate",
      icon: "",
      price: 0,
    },
    {
      title: "Order total",
      price: cartTotal,
      className: "font-medium border-none mt-3"
    },
  ];

  const handleDeleteCartItem = async (data) => {
    dispatch(removeCartItem({ _id: data.productId }));
    try {
      const { data: res } = await updateCart(data);
      console.log(res.message);
      dispatch(showToast({ message: res.message, status: "Success" }));
    } catch (error) {
      dispatch(showToast({ message: error.message, status: "Error" }));
    }
  }

  const makePayment = async () => {
    await Payment(cartProducts, cartTotal,checkout);
  }
  return (
      <div className='mt-8'>
        <div className='md:flex mt-5 gap-8'>
          <div className='md:w-[60%] px-2 rounded-md md:py-7 md:px-14 bg-slate-100'>
            {
              cartProducts.length === 0 ? <div className='h-full flex justify-center items-center text-black/65 font-semibold text-2xl/7'>
                Your cart is empty
              </div> : cartProducts.map(item =>
                <div className='border-t-2 border-b-2 py-4 grid grid-cols-6 gap-x-10 items-center'>
                  <div className='flex gap-4 items-center col-span-3'>
                    <img src={item.product.productImage[0]} className='w-[70px] h-[70px]' alt="" />
                    <div className='flex flex-col gap-4 justify-between'>
                      <div>
                        <p className='font-light overflow-hidden line-clamp-1'> {item.product.productName}</p>
                        <p className='font-medium mt-2'>{item.product.category}</p>
                      </div>
                      <span>Availabel</span>
                    </div>
                  </div>
                  <p className='bg-white text-center h-[25px]'>{ item.quantity}</p>
                  <div>
                    <span className='ld:text-lg font-bold text-sm'>Rs. {item.product.price * item.quantity}</span>
                    {/* discount if availabel */}
                  </div>
                  <button onClick={() => handleDeleteCartItem({productId: item.product._id,newQuantity: 0})}>
                    <MdDelete/>
                  </button>
                </div>
              )
            }
          </div>
          <div className='md:w-[40%] h-fit bg-slate-100 shadow-md px-10 py-12'>
            <h3 className='font-bold text-xl mb-2'>Order summary</h3>
            <div className=''>
              {
                orderSummary.map((item, index) => (
                  <div key={index} className={`${item?.className} font-light border-b-2 mt-2 flex justify-between`}>
                    <p>{item.title}{item.icon && <span>{item.icon}</span>}</p>
                    <strong className=''>Rs. {item.price}</strong>
                  </div>
                ))
              }
              <div className="flex items-center ">
                <Input placeholder="Enter Voucher Code" className="mr-2" maxLength="6" />
                <Button className="text-sm hover:bg-amber-400 bg-amber-500 font-medium h-full w-[70px] rounded-md">Apply</Button>
              </div>

            </div>
            <div onClick={makePayment} className='text-center mt-5 hover:cursor-pointer hover:bg-blue-700 bg-blue-600 rounded-md py-2 text-white'>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Cart