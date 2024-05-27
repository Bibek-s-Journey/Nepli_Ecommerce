import React, { useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SearchBar() {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef();
    const products = useSelector(state => state.productReducer.category);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleInputChange = () => {
        const inputValue = inputRef.current.value.toLowerCase();
        const filtered = products.filter(product =>
            product.category.toLowerCase().includes(inputValue)
        );
        setFilteredProducts(filtered);
    };

    const handleMouseDown = (event) => {
        if (inputRef.current.contains(event.target)) {
            return;
        }
        setFocused(false);
    };



    return (
        <div className='flex justify-between gap-4 z-2 w-[60%] md:w-[50%] shadow-md items-center px-4 rounded-lg'>
            <div className="relative search-input py-2 w-full">
                <input
                    type='search'
                    onBlur={() => setTimeout(() => setFocused(false), 100)}
                    onFocus={() => setFocused(true)}
                    onChange={handleInputChange}
                    ref={inputRef}
                    className="font-medium text-sm outline-none w-full"
                    placeholder='Search here'
                />
                {filteredProducts.length > 0 && focused && (
                    <div className={`absolute shadow-md w-full mt-4 py-4 z-50 bg-white rounded-md pl-5`}>
                        {filteredProducts.map(product => (
                            <Link
                                onClick={() => (inputRef.current.value = "")}
                                key={product._id}
                                className='block my-1'
                                to={`/categories?category=${product.category}`}
                            >
                                {product.category}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div className="search-icon">
                <span>
                    <CiSearch />
                </span>
            </div>
        </div>
    );
}

export default SearchBar;
