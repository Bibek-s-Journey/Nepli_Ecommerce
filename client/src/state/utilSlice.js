import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    isLoading: false,
    toast: {
        message: "",
        isOpen: false,
        status: null,
    },
};

export const utilSlice = createSlice({
    name: "Util",
    initialState,
    reducers: {
        Loading: (state, action) => {
            state.isLoading = action.payload.status;
         },
        showToast: (state, action) => {
            state.toast.message = action.payload.message;
            state.toast.status = action.payload.status;
            state.toast.isOpen = true;
        },
        closeToast: (state) => {
            state.toast.isOpen = false;
        }
         
    }
})

export const { showToast, closeToast, Loading } = utilSlice.actions;
export default utilSlice.reducer;