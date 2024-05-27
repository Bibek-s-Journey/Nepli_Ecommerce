import React from 'react'
import { IoIosStarHalf } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
function Star({ rating }) {
    const ratingStar = Array.from({ length: 5 }, (_, i) => (
        <span key={i}>
            {rating >= i + 1 ? (
                <FaStar color='#f0eb5d' />
            ) : rating >= i + 0.5 ? (
                <IoIosStarHalf color='#f0eb5d' />
            ) : (
                <FaRegStar color='#f0eb5d' />
            )}
        </span>
    ));

    return <div className='flex'>{ratingStar}</div>;
}

export default Star