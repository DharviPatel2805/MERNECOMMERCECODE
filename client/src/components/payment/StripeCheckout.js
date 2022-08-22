import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";
import { createOrder, emptyCart } from "../../functions/user";
import { Link } from "react-router-dom";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";

import payment from "../../images/payment.jpg";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon, credit } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon, credit).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);

      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      //here you get result after payment
      //create order and save it to database for admin process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          if (typeof window !== undefined) {
            /////empty user cart from localstorage
            localStorage.removeItem("cart");
          }

          dispatch({
            ////empty user cart from redux
            type: "ADD_TO_CART",
            payload: [],
          });

          dispatch({
            ////reset coupon to false
            type: "COUPON_APPLIED",
            payload: false,
          });

          emptyCart(user.token); /////empty cart from database
        }
      });
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    //display any errors as the customer type  their card detials
    setDisabled(e.empty); //disable pay button if there is errors
    setError(e.error ? e.error.message : ""); //show error msg
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded ? (
        <h4 className="text-center text-dark p-3 mt-3 mb-3 display-6 jumbotron bg-info">
          Complete Your Payment
        </h4>
      ) : (
        <h4 className="text-center p-3 mt-3 mb-3 display-6 jumbotron bg-success ">
           Payment Successful
        </h4>
      )}

      {!succeeded && (
        <div className="pt-4 display-9" >
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">
              {`Total After Coupon Discount: $${totalAfterDiscount}`}
            </p>
          ) : (
            <p className="alert alert-danger p-3">No Coupon Applied</p>
          )}
          {credit ? (
            <p className="alert alert-success">
              {`Total After Credit Points Discount: $${totalAfterDiscount}`}
            </p>
          ) : (
            <p className="alert alert-danger p-3">No Credit Points Applied</p>
          )}
        </div>
      )}

      <div className="text-center p-2">
        <Card
          cover={
            <img
              alt=""
              src={payment}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-2"
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total Payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />

        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span>
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>

        <br />

        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}

        <br />

        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.
          <Link to="/user/history">See it in your purchase history</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
