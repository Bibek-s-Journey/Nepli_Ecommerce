import React from 'react'
import { useGetSellerProductQuery } from "../../state/api.js"
import { useNavigate } from 'react-router-dom';

const listHeading = [
    {
        title: "S.N",
    },
    {
        title: "Product Name",
    },
    {
        title: "Product Image",
    },
    {
        title:"category"
    },
    {
        title: "Price",
    },
    {
        title: "Description",
    },
    {
        title: "CreatedAt",
    },
]

function AdminProduct() {
    const navigate = useNavigate();
    const { sellerProduct, isLoading } = useGetSellerProductQuery(null, {
        selectFromResult: ({ data, isLoading }) => {
            if (data) {
                return { sellerProduct: data.data, isLoading };
            }
            return { sellerProduct: undefined, isLoading };
        }
    });
    return (
        <div>
            <div>
                <div>
                    <ul className='grid grid-cols-8 border-b-2 gap-x-4 text-center'>
                        {
                            listHeading.map(item => (
                                <li key={item.title} className='text-indigo-400 font-medium text-lg' >{item.title}</li>
                            ))
                        }
                    </ul>
                    {
                        isLoading ? <h1>Loading...</h1> : sellerProduct?.map((item, index) => (
                            <ul key={item._id} className='grid items-center grid-cols-8 gap-x-4 border-b-2 py-5 text-center'>
                                <li className=''>{index + 1}</li>
                                <li>{item.productName}</li>
                                <li className='mx-auto'>
                                    <img className='w-[40px] ' src={item.productImage} alt="" />
                                </li>
                                <li>{ item.category}</li>
                                <li>Rs. {item.price}</li>
                                <li className='overflow-hidden line-clamp-2'>{item.description}</li>
                                <li>{item.updatedAt.split('T')[0]}</li>
                                <button onClick={() => (navigate('/dashboard/update-product', {
                                    state: {
                                        productImage: item.productImage,
                                        productName: item.productName,
                                        price: item.price,
                                        category: item.category,
                                        description: item.description,
                                    }
                                }))} className='hover:bg-indigo-700 bg-indigo-600/80 rounded-lg w-fit py-2 px-4 text-white'>edit</button>
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminProduct