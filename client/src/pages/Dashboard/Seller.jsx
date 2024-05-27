import React, { useState } from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaProductHunt } from "react-icons/fa6";
import { BiMessageSquareCheck } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BiCartAdd } from "react-icons/bi";

import SearchBar from '../../components/SearchBar.jsx';
import { NavLink, Outlet, Navigate ,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Error from '../../components/Error.jsx';
import { Container } from "../../components/component.js"
const adminLink = [
    {
        title: "Dashboard",
        to: "dashboard",
        icon: LuLayoutDashboard,
    },
    {
        title: "Your products",
        to: "your-products",
        icon: FaProductHunt,
    },
    {
        title: "Messages",
        to: "messages",
        icon: BiMessageSquareCheck,
    },
    {
        title: "Order",
        to: "orders",
        icon: AiOutlineTransaction,
    },
    {
        title: "Transcation",
        to: "transcations",
        icon: GrTransaction,
    },
    {
        title: "Add product",
        to: "add-product",
        icon: BiCartAdd,
    },
    {
        title: "Add category",
        to: "add-category",
        icon: MdOutlineBookmarkAdded,
    },
    {
        title: "Logout",
        to: "logout",
        icon: MdOutlineLogout,
    },
]

function Dashboard() {
    // const isLoggedIn = useSelector(state => state.authReducer.status);
    // if (!isLoggedIn) {
    //     return <Navigate to="/login" />
    // }
    // const { user } = useSelector(state => state.authReducer.userData);
    // console.log(user);
    // if (user?.role === "CUSTOMER") {
    //     return <Error message="You are not eligible seller." />
    // }
    
    const [sideBar, setSideBar] = useState(false);
    const toggleSideBar = () => {
        setSideBar((prev) => !prev);
    }
    return (
        <Container>
            <div className='min-h-screen'>
                <div className='dashboard flex h-full'>
                    <aside className={`${sideBar ? "flex" : "hidden"} px-2 pt-1 w-[80%] shadow-md lg:w-[15%] md:w-[30%] md:relative h-screen absolute flex-col gap-5`}>
                        <div className='flex justify-between'>
                            <Link to="/" className='font-bold text-3xl'>Nepli.</Link>to = "" 
                            <i onClick={toggleSideBar} className='md:hidden'>
                                <RxCross2 size='25px' />
                            </i>
                        </div>
                        <ul className='font-medium flex flex-col gap-3'>
                            {
                                adminLink.map((item, ind) => (
                                    <li key={ind}>
                                        <NavLink className={({isActive}) => (`${isActive && "text-blue-400"} flex items-center gap-2`)} to={item.to}>
                                            <i>
                                                {<item.icon/>}
                                            </i>
                                            {
                                                item.title
                                            }
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </aside>
                    <main className='dashboard-right w-full px-2 pt-2'>
                        <nav className='flex justify-between items-center shadow-md'>
                            <i onClick={toggleSideBar}>
                                <RiMenu2Fill size='20px' />
                            </i>
                            <SearchBar />
                        </nav>
                        <div className="dashboard-content mt-3">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </Container>
    )
}

export default Dashboard