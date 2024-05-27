import React, { useRef, useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { Button, Input, Select } from '../../components/component.js'
import { IoCloudUpload } from "react-icons/io5";
import { useAddProductMutation,useUpdateProductDetailsMutation } from '../../state/api.js';
import { useSelector } from 'react-redux'
import { showToast } from '../../state/utilSlice.js';
import { useLocation } from 'react-router-dom';

function AddProduct() {
    const dispatch = useDispatch();
    
    const location = useLocation();
    const [isUpload, setUpload] = useState(true);
    const [image, setImage] = useState(null);
    const [uploadProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductDetailsMutation();
    useEffect(() => {
        if (location.state) {
            setUpload(false);
            setImage(location.state.productImage);
        }
    }, [location.state]);
    const category = useSelector(state => (state.productReducer.category));
    const categoryArray = category?.map(item => item.category);
    const ref = useRef(null);

        console.log(categoryArray);
    const handleImage = () => {
        ref.current.click();
    }
    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData(e.target);
            let res;
            if (isUpload) {
                res = await uploadProduct(formdata);
            } else {
                res = await updateProduct(formdata);
            }
            if (res.data?.success) {
                dispatch(showToast({ message: res.data.message, status: "Success" }));
            } else {
                dispatch(showToast({ message: res.error.data.message, status:"Error"}));
            }
        } catch (error) {
            dispatch(showToast({ message: error.message || "Something went wrong", status:"Error"}));
        }
        
    }

    return (
        <div className='mt-5 py-5 px-20'>
            <form onSubmit={handleSubmitProduct}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12 text-indigo-600">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <Input required label="Food Name" defaultValue={location.state?.productName} name="productName"/>
                            </div>
                            <div className="sm:col-span-3">
                            <Input required label="price" defaultValue={location.state?.price} type="number" name="price" min = "1" />
                            </div>
                            <div className="sm:col-span-3">
                                <Select required defaultValue={location.state?.category} options={categoryArray} name="category" label="Category"/>
                            </div>
                            <div className="sm:col-span-full">
                                <div
                                className='flex flex-col'>
                                <label htmlFor="description">Description</label>
                                <textarea required defaultValue={location.state?.description} name="description" className='border-2 border-slate-300 outline-none px-5 py-3 text-black' cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div className='col-span-full'>
                                <h2 className='my-2'>Upload product</h2>
                                <div onClick={handleImage} className="w-[50%] flex items-center justify-center h-[320px]  hover:cursor-pointer border-2 rounded-lg border-black/20">
                                    <div className='w-full h-full flex items-center justify-center flex-col'>
                                        {image ? <img className='w-[400px] mx-auto h-full rounded-lg object-cover object-center' src={isUpload ? URL.createObjectURL(image) : location.state.productImage} /> : <IoCloudUpload size="100px" color='#6366F8' className='mx-auto' />}
                                        {!image && <p className='text-center font-medium tracking-tighter mt-1'>No file chosen, yet!</p>}
                                        <Input required name="productImage"  onChange={handleImageChange} hidden type="file" accept="image/*" ref={ref} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button className="text-sm font-semibold leading-6 text-gray-900" >Cancel</Button>
                        <Button className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >{isUpload ? "Upload" : "Update"  }</Button>
                    </div>
                </div>
            </form>

        </div >
    )
}

export default AddProduct