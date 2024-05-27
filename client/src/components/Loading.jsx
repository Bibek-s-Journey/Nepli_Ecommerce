import React from 'react'
import { CgSpinnerAlt } from "react-icons/cg";
function Loading() {
  return (
      <div className='bg-gray-500/60 absolute w-full h-full z-50 flex justify-center items-center'>
          <span className='animate-spin'>
              <CgSpinnerAlt color='blue' size="50px" />
         </span>
    </div>
  )
}

export default Loading