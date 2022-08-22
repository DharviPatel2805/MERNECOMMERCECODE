import axios from "axios";

export const createPaymentIntent = async (authtoken, coupon, credit) => {
  return await axios.post(
    "http://localhost:8000/api/create-payment-intent",
    { couponApplied: coupon, creditApplied: credit },
    {
      headers: {
        authtoken,
      },
    }
  );
};
