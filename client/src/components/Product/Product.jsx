import React from 'react';
import { Link } from 'react-router-dom';
import ProductCart from "./ProductCart.jsx";

function Product({ products }) {
    if(products?.length === 0) return <h1 className='text-xl mt-4 text-center tracking-tight font-medium'>No product available</h1>;

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-14 content-center justify-items-center'>
            {
                products?.map((item) =>
                    <Link key={item._id} to={`/products/${item._id}`}>
                        <ProductCart id={item._id} productImage={item.productImage[0]} productName={item.productName} price={item.price} rating={item.rating} />
                    </Link>
                )
            }
        </div>
    );
}

export default Product;
