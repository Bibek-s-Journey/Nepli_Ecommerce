import React, { useEffect,useState } from 'react'
import SearchBar from '../SearchBar'
import { Link } from 'react-router-dom'
import { IoPerson } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { logout as userLogout } from '../../state/authSlice';
import { useLogoutMutation } from '../../state/api';
import { Loading, showToast } from '../../state/utilSlice';

import { store } from '../../state/store';
import { persistor } from '../../state/store';
import storage from "redux-persist/lib/storage";
const profileList = [
  {
    icon: VscAccount,
    text: "Your profle",
    to: "/account/profile"
  },
  {
    icon: AiOutlineTransaction,
    text: "My order",
    to: "/order"
  },
  {
    icon: GoCodeReview,
    text: "My review",
    to: "/review"
  },
  {
    icon: MdOutlineCancel,
    text: "My cancellations",
    to: "/cancellations"

  },
  {
    icon: MdOutlineLogout,
    text: "Logout",
    to: "",
  },
]

function Navbar() {
  const isLoggedIn = useSelector(state => state.authReducer.status)
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  useEffect(() => {
    if (isLoading) {
      dispatch(Loading({ status: true }));
    } else {
      dispatch(Loading({ status: false }));
    }
  }, [isLoading])
  
  const handleLogout = async () => {
    dispatch(userLogout());
    try {
      const {data} = await logout();
      dispatch(showToast({message: data.message,status: "Success"}));
      dispatch({type:"RESET"});
      await persistor.purge();
      await storage.removeItem('persist:root');
    } catch (error) {
      dispatch(showToast({ message: "Something went wrong!", status:"Error"}));
    }
  } 
  
  return (
    <div className='relative px-4 py-2'>
      <nav className='flex justify-between items-center'>
        <div className="logo">
          <Link to="/">
            <h3 className='text-2xl font-semibold'>Nepli.</h3>
          </Link>
        </div>
        <SearchBar width='60' />

        <div className="nav-icons hidden md:flex gap-6 items-center">
          {
            !isLoggedIn ? <div className="profile-icon">
              <Link to='/login' className='flex gap-2 border-2 border-gray-700 rounded-md p-1'>
                <span className='font-bold'>Login</span>
              </Link>
            </div> : <div className='relative' onMouseLeave={() => (document.querySelector(".profile").style.display = "none")} onMouseMove={() => (
              document.querySelector(".profile").style.display = "flex")}>
              <div className='relative'>
                <i className='hover:text-sky-500 hover:cursor-pointer'>
                  <Link to="/account/profile">
                    <IoPerson size='22px' />
                  </Link>
                </i>
                <div className='profile hidden min-w-52 w-[15rem] flex-col gap-2 absolute top-5 right-[-3.9rem] p-4 rounded-md shadow-md bg-white z-30'>
                  {
                    profileList.map((Item, index) =>
                      <Link
                        onClick={Item.text === "Logout" ? (handleLogout) : null}
                        to={Item.to}
                        key={index}
                        className='flex gap-3 hover:text-slate-700 hover:underline'>
                        <i>
                          <Item.icon />
                        </i>
                        <p className='hover:text-sky-500'>{Item.text}</p>
                      </Link>)
                    }
                </div>
              </div>
            </div>
          }
          <div className="cart-icon">
            <Link to={isLoggedIn ? "/cart" : "/login"}>
              <RiShoppingCartLine size='22px' />
            </Link>
          </div>
        </div>
      </nav >
    </div >
  )
}

export default Navbar