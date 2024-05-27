import React from 'react'

function Payment() {
  return (
    <div>
      <div>
        <h1 className='font-bold mb-5 text-2xl tracking-tighter'>My Payment Options</h1>
        <div>
          <h4 className='tracking-tighter text-slate-600'>Account</h4>
          <div>
            {
              <div className='text-center mt-3 font-light'>
                <h2 className='text-2xl'>You haven't connect your payment options.</h2>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment