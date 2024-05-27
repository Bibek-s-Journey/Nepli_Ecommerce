import React from 'react'
import Button from '../Button'
import { FaGreaterThan } from "react-icons/fa6";
import Star from '../Star';
function Review() {
    return (
        <div>
            <div>
                <Star/>
            </div>
            <p className='text-[12px]'>Delightfull and Delicious</p>
            <div>

            </div>
            <div className='flex items-center justify-center gap-2  text-sky-500'>
                <Button childern="View All" className='text-sm font-medium' />
                <FaGreaterThan size='14px'/>
            </div>
        </div>
    )
}

export default Review