import React from 'react'
import { RecordCart } from '../../components/component'
import { AdminProduct } from '..'
function Dashboard() {
    return (
        <div className='w-full min-h-screen'>
            <div className='grid grid-cols-3 gap-y-10'>
                <RecordCart title="Total users" growthRate={30} number={100} />
                <RecordCart title="Total Orders" growthRate={30} bg_color="bg-gradient-to-r from-violet-400 to-purple-300" number={100} />
                <RecordCart className="row-span-2" title="Total Sales" growthRate={30} number={100} bg_color="bg-gradient-to-r from-orange-500 to-orange-200" />
                <RecordCart title="Total Products" growthRate={30} number={100} bg_color="bg-gradient-to-r from-red-500 to-red-200"/>
                <RecordCart title="Total Reviews" growthRate={30} number={100} bg_color="bg-gradient-to-r from-green-500 to-green-200" />
            </div>
            <div className='mt-10'>
                <h1 className='text-2xl mb-4 font-medium tracking-tighter'>Best Selling products</h1>
                <AdminProduct/>
            </div>
        </div>
    )
}

export default Dashboard