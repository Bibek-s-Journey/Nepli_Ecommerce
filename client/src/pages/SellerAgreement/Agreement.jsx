import React,{useId} from 'react'
import { useBecomeSellerMutation } from '../../state/api'

const terms = [
    {
        heading: "Introduction",
        content: "Welcome to our food delivery ecommerce platform, where you can explore a wide variety of culinary delights from local restaurants, all available at your fingertips. Our platform aims to revolutionize the way you experience food delivery by offering a seamless and convenient ordering process. Whether you're craving your favorite comfort food, seeking a new culinary adventure, or simply looking for a quick and easy meal solution, we've got you covered. With an extensive selection of restaurants and dishes to choose from, along with flexible delivery options, we're committed to providing you with an unparalleled dining experience right from the comfort of your own home."
    },
    {
        heading: "Acceptance of Terms",
        content: "By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. These terms govern your use of our platform and any services offered therein. If you do not agree to these terms, please refrain from accessing or using our platform. By using our platform, you represent that you are at least the age of majority in your jurisdiction and have the legal capacity to enter into binding contracts. We reserve the right to update, modify, or replace these terms at any time without prior notice. It is your responsibility to review these terms periodically for changes. Your continued use of our platform following the posting of any changes constitutes acceptance of those changes."
    },
    {
        heading: "Privacy Policy",
        content: "We respect your privacy and are commited to protecting your personal information. Please review our privacy policy for details on how we collect, use and protect your data."
    },
    {
        heading: "Changes to Terms",
        content: "We reserve the right to update or modify these terms and conditions at any time. Changes will be effective immediately upon posting."
    },
    {
        heading: "Contect Information",
        content: "If you have any questions or concerns about these and conditions, please contact us at +977 9818031071"
    }
]
function Agreement() {
    const id = useId();
    const [becomeSeller] = useBecomeSellerMutation();
    const handleBecomeSeller = async () => {
        try {
            const res = await becomeSeller();
            console.log(res);
        } catch (error) {
            
        }
    }
    return (
        <div className='mt-6 w-[70%] mx-auto '>
            <h1 className='text-center font-medium text-2xl'>Terms and Conditions</h1>
            <div className='flex flex-col gap-4'>
                {
                    terms.map(item =>
                        <div key={id}>
                            <h3 className='text-sky-600 font-medium text-lg'>{ item.heading}</h3>
                            <p>{ item.content}</p>
                        </div>
                    )
                }
            </div>
            <div onClick ={handleBecomeSeller} className='bg-sky-600/70 w-fit p-2 text-white/85 mt-10 mx-auto'>
                <button className=''>I accept the above terms and conditions</button>
            </div>
        </div>
    )
}

export default Agreement