import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// todo
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK_KEY);

const Payment = () => {
    return (
        <div>
            <SectionTitle title="Payment" />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;