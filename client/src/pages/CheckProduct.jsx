import React from 'react'
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";

function CheckProduct() {
  return (
    <div className='flex items-center justify-between'>
      <span onClick={() => (window.history.back())}><MdKeyboardArrowLeft size='35px' /></span>
      <div className="search-place-holder flex items-center justify-between px-3 shadow-md py-1 flex-1">
        <input type="text" placeholder='search here' className='placeholder:italic placeholder:text-slate-400 flex-1 outline-none'/>
        <div className="flex items-center gap-5">
          <span>
            <RxCross2 />
          </span>
          <div className='rounded-full p-2 bg-blue-200'>
            <CiSearch size='20px' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckProduct;