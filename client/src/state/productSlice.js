import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    category: null,
    productName: [],
}

export const categorySlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setProductName: (state, action) => {
            state.productName = action.payload;  
        }
    }
})

export const {setCategory,setProductName} = categorySlice.actions
export default categorySlice.reducer