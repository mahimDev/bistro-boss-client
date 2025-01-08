import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState("")
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart] = useCart()
    const { user } = useAuth()
    const amount = cart.reduce((total, item) => total + item.menu_price, 0)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: amount })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, amount])
    // console.log(clientSecret)
    const handleSubmit = async e => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // console.log(error)
            setError(error.message)
        } else {
            // console.log('success card payment method', paymentMethod)
            setError('')
        }
        // confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            // console.log("confirm error", confirmError)
        } else {
            // console.log("payment intent", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)
                // now save the payment in the database
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    price: amount,
                    date: new Date(),
                    transactionId,
                    cartIds: cart.map(item => item._id),
                    menu_ids: cart.map(item => item.menu_id),
                    status: "pending"
                }
                const res = await axiosSecure.post('/payment', payment)
                console.log(res.data)

            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="my-5 text-2xl"> Amount : {amount}</h1>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn bg-orange-500 px-9 mt-10" type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-400">{error}</p>
            {transactionId && <p className="text-green-500 mt-10">your Transaction id  : {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;