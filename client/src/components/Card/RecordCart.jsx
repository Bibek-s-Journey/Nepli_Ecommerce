import React from 'react'

function RecordCart({className, growthRate, title, number,bg_color }) {
    return (
        <div className={`text-white rounded-md relative px-4 py-3 overflow-hidden w-[350px] h-full ${bg_color || "bg-gradient-to-r from-blue-400 to-cyan-300/80"} ${className}`}>
            <div className='w-full h-full flex flex-col justify-between gap-5'>
                <div>
                    <h3 className='text-2xl'>{ title}</h3>
                    <p className='mt-1 text-3xl'>{ number}</p>
                </div>
                <div className='flex text-lg'>
                    <i>{ growthRate < 0 ? "-" : "+"}</i>
                    <p>{ growthRate}%</p>
                </div>
            </div>
        </div>
    )
}

export default RecordCart
