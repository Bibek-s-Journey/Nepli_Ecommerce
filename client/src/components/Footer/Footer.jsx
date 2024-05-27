import React from 'react'
import { Link } from 'react-router-dom'

import { payment_Icon } from '../../assets/index.js'


const footerContent = [
  {
    heading: "About us",
    list: [
      {
        item: "Our mission",
      },
      {
        item: "Press",
      },
      {
        item: "Courses",
      },
      {
        item: "Sitemap",
      },
      {
        item: "Careers",
      },
      {
        item: "Privacy Policy",
      },
      {
        item: "Affiliate Program",
      },
      {
        item: "What's new?",
      },
    ]
  },
  {
    heading: "Customer Care",
    list: [
      {
        item: "Help center",
      },
      {
        item: "Returns & Refunds",
      },
      {
        item: "Contact us",
      },
    ]
  },
  {
    heading: "Earn with us",
    list: [
      {
        item: "Become Seller",
      },
      {
        item: "Become Affiliate",
      },
    ]
  },
  {
    heading: "Payment Methods",
    icon: [
      {
        image: payment_Icon.esewa,
      },
      {
        image: payment_Icon.imePay,
      },
      {
        image: payment_Icon.khalti,
      },
      {
        image: payment_Icon.mastercard,
      },
      {
        image: payment_Icon.visa,
      },
    ]
  },
]

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white mt-14 py-8'>
      <div className='grid md:grid-cols-4 gap-2 md:w-[85%] mx-auto'>
        {footerContent.map((item, index) => (
          <div key={index}>
            {item.heading && <h2 className='text-2xl text-sky-300'>{item.heading}</h2>}
            <ul className='mt-1'>
              {item.list && item.list.map((element, idx) => (
                <li key={idx} className='hover:text-sky-200'>
                  <Link to={element.path}>{element.item}</Link>
                </li>
              ))}
            </ul>
            {item.icon && item.icon.length > 0 && (
              <ul className='flex flex-wrap gap-2 mt-2'>
                {item.icon.map((ele, idx) => (
                  <li key={idx}>
                    <Link to={ele.path}>
                      <img className='w-[80px] h-[35px]' src={ele.image} alt="" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer