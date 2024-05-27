import React from 'react'
import { Link } from 'react-router-dom'
const menubar_list = [
    {
        title: "Category",
        to:"/category"
    },
    {
        title: "Cart",
        to:"/cart",
    },
    {
        title:"Account",
        to: "/cateogry"
    },
]

function MenuBar() {
    return (
        <div className='absolute w-full h-[80vh] mt-2 bg-red-200 text-center'>
            <ul>
                {
                    menubar_list.map(item => (
                        <li>
                            <Link to={item.to}>{ item.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MenuBar