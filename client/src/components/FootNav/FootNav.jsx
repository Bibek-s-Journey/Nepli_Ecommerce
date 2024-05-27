import React, { useId } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

const footNavList = [
    {
        to: "/home",
        title: "Home",
        icon: IoMdHome,
    },
    {
        to: "/category",
        title: "Category",
        icon: BiSolidCategoryAlt,
    },
    {
        to: "/cart",
        title: "Cart",
        icon: FaShoppingCart,
    },
    {
        to: "/account",
        title: "Account",
        icon: IoPerson,
    },
]

const FootNav = () => {
    const id = useId();
    return (
        <div className='md:hidden bg-white fixed w-full bottom-0 px-4 py-1'>
            <ul className='flex justify-between items-center'>
                {
                    footNavList.map(ele => (
                        <li key={ele.title}>
                            <NavLink to={ele.to} className={({ isActive }) => (`flex flex-col ${isActive && 'text-sky-400'} items-center text-slate-500`)}>
                                <ele.icon size='22px' />
                                <span className='text-sm'>{ele.title}</span>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FootNav