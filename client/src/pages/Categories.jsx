import React from 'react'
import Category from "../components/Category/Category.jsx"
import { useGetCategoryProductQuery } from '../state/api.js'
import { useSearchParams } from 'react-router-dom';
import { Product } from '../components/component.js';
import { useSelector } from 'react-redux';
function Categories() {

  const currentUser = useSelector(state => state.authReducer.userData);
  const [param] = useSearchParams();
  const category = param.get("category")
  const { categorys, isLoading, isError } = useGetCategoryProductQuery(category, {
    selectFromResult: ({ data,isError,isLoading }) => {
      if (data) {
        return {categorys: Array.from(data.data).filter(item => item.owner != currentUser?._id),isLoading,isError}
      }
      return { categorys: undefined, isLoading, isError };
    }
  });
  return (
    <div className='mt-5'>
      <div className='flex gap-10'>
      <div className='hidden lg:block lg:w-[17rem]'>
          <Category />
        </div>
        <div className='w-[100%] lg:w-[80%]'>
          {
            isLoading ? <h1>Loading...</h1> : isError ? <h1>Error</h1> :
              <Product product={categorys}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Categories