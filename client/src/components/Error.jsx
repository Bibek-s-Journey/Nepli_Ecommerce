import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Error({ message }) {
    const navigate = useNavigate();
    
    return (

        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{ message}</h1>
                {/* <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p> */}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to='/account/profile' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back</Link>
                    <div onClick={ () => navigate("/become-seller-terms") } className="hover:cursor-pointer text-md font-semibold text-gray-900">Become seller <span aria-hidden="true" className='hover:translate-x-2.5'>&rarr;</span></div>
                </div>
            </div>
        </main>
    )
}

export default Error