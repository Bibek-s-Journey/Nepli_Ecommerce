import React from 'react'

function NewAddress() {
    const handleSubmit = async (e) => {
        const formData = new FormData(e.target);
        try {
            
        } catch (error) {
            
        }
    }
    return (
        <div className='w-[70%] mx-auto'>
            <h1 className='text-center text-xl mb-10 font-bold tracking-tighter'>New Address</h1>
            <form onSubmit={handleSubmit}>
                <h4 className='font-bold mb-2'>Address</h4>
                <div className='grid grid-cols-2 gap-3'>
                    <input type="text" name='streetName' required placeholder='Street Name' className='border-2 border-slate-400 rounded-md p-1' />
                    <input type="text" name='postalCode' required placeholder='Postal code' className='border-2 border-slate-400 rounded-md p-1'/>
                    <input type="text" name='city' required placeholder='City' className='border-2 border-slate-400 rounded-md p-1'/>
                    <input type="text" name='state' required placeholder='State' className='border-2 border-slate-400 rounded-md p-1'/>
                    <input type="text" name='country' defaultValue={"Nepal"} required placeholder='Country' className='border-2 border-slate-400 rounded-md p-1'/>
                </div>
                <h4 className='font-bold mt-5'>Contact</h4>
                <div className='mt-1'>
                    <input type="number" max={10} placeholder='Enter your contact number' className='no-spinner border-2 border-slate-400 rounded-md p-1'/>
                </div>
                <button type='submit' className='rounded-md bg-black text-white py-1 px-4 mt-4 hover:bg-black/80'>Submit</button>
            </form>
        </div>
    )
}

export default NewAddress