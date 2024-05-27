import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaGreaterThan } from "react-icons/fa6";
import { useParams, Link } from 'react-router-dom';
import { useGetProductQuery } from '../../state/api'
import { Button, Review, Star } from '../../components/component';
import { addCart, totalAmount } from '../../state/authSlice.js';
import { useNavigate } from 'react-router-dom';

import { useAddCartMutation } from '../../state/api';
import { showToast } from '../../state/utilSlice.js';

function ProductDetail() {
  const navigate = useNavigate();
  const authUser = useSelector(state => state.authReducer.status);

  const params = useParams();
  const { currentProduct, isLoading, isError } = useGetProductQuery(params.productId, {
    selectFromResult: ({ data, isLoading, isError }) => {
      if (data) {
        return { currentProduct: data?.data, isLoading, isError };
      }
      return { currentProduct: undefined, isLoading, isError };
    }
  });
  console.log(currentProduct);
  const [addCartItem] = useAddCartMutation();
  const dispatch = useDispatch();

  const handleBuyNow = () => {
    if (authUser) {

    } else {
      navigate('/login');
    }
  }
  const handleAddToCart = async () => {
    if (authUser) {
      dispatch(addCart({ product: currentProduct, quantity: 1 }))
      dispatch(totalAmount());
      // TODO:Error or exception handling
      const { data: responseData } = await addCartItem({ productId: currentProduct?._id, quantity: 1 });
      dispatch(showToast({ message: responseData?.message, status: responseData?.success ? "Success" : "Error" }))
    } else {
      navigate('/login');
    }
  }

  if (isError) return <h1>Error!</h1>
  if (isLoading || !currentProduct) return <h1>Loading...</h1>

  return (
    <div className='w-full mt-4'>
      <div className='w-full p-5'>
        <div className='lg:flex gap-4'>
          <div className='lg:w-[70%] md:flex md:gap-12'>
            <img src={currentProduct.productImage[0]} className='md:w-[330px] rounded-md' alt="" />
            <div className='shadow-md p-2 flex-1'>
              <div className='mt-4 pb-3 px-2'>
                <p className='font-bold text-lg capitalize'>{currentProduct.productName}</p>
                <div className='mt-1 flex justify-between'>
                  <p className='text-xl font-semibold'>Rs. {currentProduct.price}</p>
                  <div className='mt-1 flex gap-2 items-center'>
                    <i>
                      <FaStar color='#f0eb5d' size='20px' />
                    </i>
                    <p className='font-semibold'>{currentProduct.rating}/5</p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className='flex justify-between px-2'>
                  <div className='flex gap-1 justify-center items-center'>
                    <TbTruckDelivery/>
                    <p className='text-sm font-semibold'>Standard Delivery</p>
                  </div>
                  <p className='font-semibold text-sm'>Rs.50</p>
                </div>
              </div>
              <div className='flex mt-5 justify-between'>
                <Button onClick={handleBuyNow} className=' bg-sky-400 px-5 py-2 rounded-md text-slate-50 text-sm'>Buy Now</Button>
                <Button onClick={handleAddToCart} className=' bg-sky-400 px-5 py-2 rounded-md text-slate-50 text-sm'>Add to Cart</Button>
              </div>
              <div className='description mt-10'>
                <h3 className='text-lg font-medium tracking-tighter  my-2'>Description</h3>
                <p>{currentProduct.description}</p>
              </div>

            </div>
          </div>
          <div className='lg:w-[30%] mt-1 w-full shadow-md p-2'>
            <div className='flex gap-4 items-center'>
              <img src="" className='w-[25px] h-[25px] rounded-full object-cover bg-black' alt="" />
              <p>owner</p>
            </div>
            <div className='flex w-full gap-4 mt-3'>
              <div className='w-[50%] text-center border-sky-500 border-2 rounded-md'>
                <Button children="Follow" className="text-sm" />
              </div>
              <div className='w-[50%] text-center border-sky-500 border-2 rounded-md'>
                <Link className="text-sm">Visit Store</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:flex lg:gap-4'>
          <div className="lg:w-[60%] rating my-5 p-2 shadow-md">
            <h1>Ratings & Reviews</h1>
            <div className='flex gap-3 my-1'>
              <Star rating="5" />
              <i>star</i>
            </div>
            <div className='flex gap-2'>
              <Link className='bg-gray-200 text-sm w-[50%] flex items-center justify-between px-3 rounded-sm'>
                <div className='flex items-center gap-2'>
                  <i>
                    <FaCamera />
                  </i>
                  <p>Photos</p>
                </div>
                <FaGreaterThan size='10px' />
              </Link>
              <Link className='text-sm flex items-center justify-between bg-gray-200 px-3 rounded-sm w-[50%]'>
                <div className="flex items-center gap-2">
                  <i>
                    <FaVideo />
                  </i>
                  <p>Videos</p>
                </div>
                <FaGreaterThan size="10px" />
              </Link>
            </div>
            {
              currentProduct.reviews.length === 0 ? <h3 className='my-5 text-center'>No reviews available</h3>
                : <div className="my-1">
                  <Review />
                </div>
            }
          </div>
          <div className='lg:w-[40%] question_answer shadow-md p-2'>
            <div>
              <h3>Question and Answers</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail