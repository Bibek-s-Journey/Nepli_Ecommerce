import React, { lazy, Suspense } from 'react';
import heroImg from "../../assets/heroSection.jpg";
import { useGetProductsQuery } from "../../state/api.js";
import { Category, Error } from '../../components/component';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

// Lazy load the Product component
const Product = lazy(() => import('../../components/Product/Product.jsx'));

function Home() {
  const currentUser = useSelector(state => state.authReducer.userData);
  const { data: productsData, isLoading, isError } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => {
      if (data) {
        const productList = Array.from(data.data).filter(item => item.owner !== currentUser?._id);
        return { data: productList || undefined, isLoading, isError };
      }
      return { data: undefined, isLoading, isError };
    },
  });

  if (isError) {
    return <Error message="Something went wrong." />;
  }

  return (
    <div className='min-h-screen mt-3'>
      <div className='flex flex-col-reverse md:flex-row gap-4'>
        <div className="hidden lg:block p-2 lg:w-[17rem] drop-shadow-lg">
          <Category />
        </div>
        <div className='clip-hero drop-shadow-lg shadow-md overflow-hidden rounded-lg w-full'>
          <img src={heroImg} className='object-fill md:object-cover md:h-[30rem] w-full shadow-lg' alt="Hero" />
        </div>
      </div>
      <div className="top-rated pt-20 bg-slate-50">
        <h1 className='text-center text-2xl font-bold mb-5'>Top Rated</h1>
        {
          isLoading ? <ClipLoader size={50} color={"#123abc"} loading={isLoading} /> : (
            <Suspense fallback={<ClipLoader size={50} color={"#123abc"} loading={true} />}>
              <Product products={productsData} />
            </Suspense>
          )
        }
      </div>
    </div>
  );
}

export default Home;
