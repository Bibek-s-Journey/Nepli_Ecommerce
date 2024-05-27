import React from 'react'
import { category } from '../../assets/index.js'
import { Link } from 'react-router-dom'
const categoryList = [
    {
        icon: category.gilda,
        text: "Appetizers",
        to: "/categories?category=appetizers",
    },
    {
        icon: category.salad,
        text: "Salads",
        to: "/categories?category=salads",
    },
    {
        icon: category.fabada,
        text: "Soups and stews",
        to: "/categories?category=soups-stews",
    },
    {
        icon: category.wrap,
        text: "Sandwiches and wraps",
        to: "/categories?category=sandwiches-wraps",
    },
    {
        icon: category.noodles,
        text: "Pasta and noodles",
        to: "/categories?category=pasta-noodles",
    },
    {
        icon: category.pizza,
        text: "Instant Food",
        to: "/categories?category=instant-food",
    },
    {
        icon: category.meal,
        text: "Main courses",
        to: "/categories?category=main-courses",
    },
    {
        icon: category.food,
        text: "side dishes",
        to: "/categories?category=side-dishes",
    },
    {
        icon: category.cakeSlice,
        text: "Desserts",
        to: "/categories?category=desserts",
    },
    {
        icon: category.cocktail,
        text: "Beverages",
        to: "/categories?category=beverages",
    },
    
]

function Category() {
  return (
      <div className='flex flex-col gap-2 shadow-lg rounded-md bg-white px-2 py-4'>
          {
              categoryList.map((item, index) => (
                  <div key={index} className='flex gap-3'>
                      <img src={item.icon} className='lg:w-[20px] md:w-[12px]' alt="" />
                      <Link to={item.to} className='hover:text-sky-500'>{item.text}</Link>
                  </div>
              ))
          }
    </div>
  )
}

export default Category