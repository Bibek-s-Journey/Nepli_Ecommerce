import React,{useId} from 'react'
import { Link, NavLink, Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const accountLinks = [
  {
    heading: "Manage My Account",
    to:"profile",
    list: [
      {
        item: "My Profile",
        to:"profile"
      },
      
      {
        item: "Vouchers",
        to:"voucher"
      },
    ],
  },
  {
    heading: "My Orders",
    to:"orders",
  },
  {
    heading: "My Reviews",
    to:"reviews"
  },
  {
    heading: "Seller Profile",
    to: "/seller/dashboard"
  }
]

const Account = () => {
  const isLoggedIn = useSelector(state => state.authReducer.status);
  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }
  const id = useId();
  return (
    <div className='mt-8 flex gap-16'>
      <div className="w-[20%] pl-2 shadow-md">
        <div className='flex flex-col gap-2'>
          {
            accountLinks.map((item, index) => <div key={index}>
              <h1 className='text-lg font-semibold text-slate-600 mb-1'>
                <Link to={item.to}>
                  {item.heading}                
                </Link>
              </h1>
              {
                item?.list && item.list.map(ele => (
                  <ul key={id} className='pl-4'>
                    <li className='mb-1 text-sm'>
                      <NavLink to={ele.to} className={({isActive}) => (`${isActive && "text-blue-500"}`)} >{ ele.item}</NavLink>
                    </li>
                  </ul>
                ))
              }
            </div>)
          }
        </div>
      </div>
      <div className='w-full'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Account