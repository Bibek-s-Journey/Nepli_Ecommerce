import { current } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "foodApi",
    tagTypes: [
        "User",
        "Product",
        "Category",
        "Seller",
        "Payment"
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: () => ({
                method: "GET",
                credentials: "include",
                url: 'users/get-Current-user'
            }),
            providesTags: ["User"]
        }),
        addUser: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                url: "users/register",
            }),
            providesTags: ["User"],
        }),
        logUser: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "users/login",
            }),
        }),
        logout: build.mutation({
            query: () => ({
                method: "POST",
                credentials: "include",
                url: "users/logout",
            }),
        }),
        changePassword: build.mutation({
            query: (data) => ({
                method: "POST",
                
                body: data,
                credentials: "include",
                url: "users/changePassword",
            }),
            providesTags: ["User"],
        }),
        updataAddress: build.mutation({
            query: (data) => ({
                url: "/users/changeAddress",
                body: data,
                method: "POST",
            })
        }),

        // seller endpoints
        addProduct: build.mutation({
            query: (data) => ({
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
                url: "products/upload-product",
                credentials: "include",
            }),
            invalidatesTags: ["Product"],
        }),
        getSellerProduct: build.query({
            query: () => ({
                method: "GET",
                credentials: "include",
                url: "products/getSellerProducts",
            }),
            providesTags: ["Seller"],
        }),
        updateProductDetails: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "/"
            })
        }),

        getProducts: build.query({
            query: () => "products/get-products",
            providesTags: ["Product"]
        }),
        getProduct: build.query({
            query: (id) => `products/${id}`,
        }),
        getCategory: build.query({
            query: () => "categories/get-categories",
            providesTags: ["Category"]
        }),
        getCategoryProduct: build.query({
            query: (category) => `categories?category=${category}`,
            providesTags: ["Category"],
        }),

        addCart: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "users/add-cart"
            }),
            providesTags: ["User"]
        }),
        getCartItem: build.query({
            query: () => ({
                method: "GET",
                credentials: "include",
                url: "users/get-cartItem"
            }),
            providesTags: ["User"],
        }),
        updateCartItem: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "users/update-cartItems"
            }),
            providesTags: ["User"],
        }),
        becomeSeller: build.mutation({
            query: () => ({
                method: "POST",
                credentials: "include",
                url: "/users/become-seller-terms"
            }),
            providesTags: ["User"]
        }),
        reviewProduct: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "/product/review",
            })
        }),

        makePayment: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "/payment/checkout-products",
            }),
            providesTags: ["Payment"],
        }),

        orderedProduct: build.mutation({
            query: (data) => ({
                method: "POST",
                credentials: "include",
                body: data,
                url: "users/orderProducts"
            }),
        }),

        getProductsName: build.query({
            query: () => "/products/getProductsName",
            providesTags: ["Product"],
        }),
        addAddress: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "/address/new-address",
            }),
        })
    })
})

export const {

    useGetProductsNameQuery,

    useMakePaymentMutation,

    useUpdateProductDetailsMutation,
    useGetSellerProductQuery,
    useAddProductMutation,
    useBecomeSellerMutation,

    useUpdateCartItemMutation,
    useGetCartItemQuery,
    useAddCartMutation,
    useGetCategoryProductQuery,
    useGetUserQuery,
    useChangePasswordMutation,
    useAddUserMutation,
    useLogUserMutation,
    useGetProductsQuery,
    useGetCategoryQuery,
    useGetProductQuery,
    useLogoutMutation,
} = userApi;