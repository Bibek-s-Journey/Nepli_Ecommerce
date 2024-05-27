import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status: false,
    userData: null,
    cartItem: [
    ],
    cartTotal: 0,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("when");
            state.status = true;
            state.userData = action.payload.data;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.cartItem = [];
            state.cartTotal = 0;
        },
        addCart: (state, action) => {
            console.log(action.payload);
            const { product } = action.payload;
            const existingItem = state.cartItem.find(item => item.product._id === product._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItem.push({ ...action.payload });
            }

        },
        removeCartItem: (state, action) => {
            console.log(action.payload._id);
            state.cartItem = state.cartItem.filter(item => (item.product._id !== action.payload._id));
        },
        totalAmount: (state) => {
            let total = 0;
            state.cartItem.map(item => {
                total += item.product.price * item.quantity;
            })
            state.cartTotal = total;
        },
        clearCart: (state) => {
            state.cartItem = [],
                state.cartTotal = 0;
        },
        setCart: (state, action) => {
            state.cartItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase("RESET", () => initialState)
    }
});

export const { login, logout, totalAmount, clearCart, removeCartItem, addCart, setCart } = authSlice.actions;

export default authSlice.reducer;
