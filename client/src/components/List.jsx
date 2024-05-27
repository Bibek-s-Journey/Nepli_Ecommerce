import React from 'react'

function List({lists}) {
  return (
    <div>
          {lists.map((item, index) => (
          <div key={index}>
            {item.heading && <h2 className='text-2xl text-sky-300'>{item.heading}</h2>}
            <ul className='mt-1'>
              {item.list && item.list.map((element, idx) => (
                <li key={idx} className='hover:text-sky-200'>
                  <Link to={element.path}>{element.item}</Link>
                </li>
                //my name is bibek tamnag 
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
  )
}

export default List