
export async function Payment(cartProducts,cartTotal,checkout) {
    try {
        const res = await checkout({ cartProducts, cartTotal });
        if (res?.data) {
            console.log(res.data.data.payment_url);
            window.location.href = res.data.data.payment_url;
        }
       
    } catch (error) {
        console.log("stripe error");
    }
}
