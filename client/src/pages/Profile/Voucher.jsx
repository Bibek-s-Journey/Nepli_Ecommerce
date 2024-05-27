import React from 'react'


const voucher = [
  {
    title: "Active",
  },
  {
    title: "Uses",
  },
  {
    title: "Voucher Code",
  },
  {
    title: "Valid Form",
  },
  {
    title: "Valid Unit",
  },
  {
    title: "Value",
  },
]

function Voucher() {
  return (
    <div className='w-full'>
      <div>
        <h1 className='font-bold mb-5 text-2xl tracking-tighter'>Voucher</h1>
        <div className='bg-slate-100'>
          <div>
            <ul className='grid grid-cols-6 shadow-md py-3'>
              {
                voucher.map((ele, index) => (<li key={index}>{ele.title }</li>))
              }
            </ul>
          </div>
          <div >
            {
              <h2 className='text-center'>There are no vouchers yet</h2>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Voucher