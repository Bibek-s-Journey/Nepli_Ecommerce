import React, { useState } from 'react';
import Star from '../Star';
import { ClipLoader } from 'react-spinners';

const Placeholder = ({ width, height }) => (
    <div
        style={{ width, height }}
        className='flex justify-center items-center bg-gray-200'>
        <ClipLoader size={30} color={"#123abc"} />
    </div>
);

const ProductCart = React.memo(({ id, productImage, productName, price, rating }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className='bg-white hover:scale-105 w-[165px] md:w-[200px] flex flex-col gap-3 shadow-lg overflow-hidden rounded-xl'>
            <div className='relative w-full h-[150px] md:h-[210px]'>
                {!loaded && <Placeholder width="100%" height="100%" />}
                <img
                    src={productImage}
                    loading='lazy'
                    className={`object-cover w-full h-full rounded-md ${loaded ? 'block' : 'hidden'}`}
                    onLoad={() => setLoaded(true)}
                    alt={productName}
                />
            </div>
            <div className='pl-2 flex flex-col gap-1 w-full'>
                <p className='font-normal text-[17px] text-start font-sans capitalize overflow-hidden line-clamp-2'>{productName}</p>
                <div className='rating'>
                    <Star rating={rating} />
                    <p className='font-extrabold text-sky-500 mb-3'>Rs.{price}</p>
                </div>
            </div>
        </div>
    );
});

export default ProductCart;
