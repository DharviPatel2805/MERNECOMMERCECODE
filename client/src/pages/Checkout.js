import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserCart,
  emptyCart,
  saveUserAddress,
  applyCoupon,
  createCashOrder
} from "../functions/user";

import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountErr, setDiscountErr] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user} = useSelector((state) => ({ ...state }));
  const { couponApplied } = useSelector((state) => (state.coupon));


  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("get user cart", res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const handleEmptyCart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        localStorage.removeItem("cart");
      }
    }

    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    //remove from backend
    emptyCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setCoupon("");
      setTotalAfterDiscount(0);
      toast.success("cart is empty! continue shopping!");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("coupon", coupon);
    applyCoupon(coupon, user.token).then((res) => {
      console.log("applied coupon", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        setDiscountErr(false);
        //update redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountErr(res.data.err);
        //update redux coupoon
        dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill onChange={setAddress} />
      <br />
      <button className="btn btn-info" onClick={saveAddressToDb}>
        save
      </button>
    </>
  );

  const showOrderSummery = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} {p.color} = {p.price} x {p.count}{" "}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        value={coupon}
        type="text"
        className="form-control"
        onChange={(e) => setCoupon(e.target.value)}
      />
      <br />
      <button className="btn btn-info" onClick={applyDiscountCoupon}>
        Apply
      </button>
    </>
  );

  const handleCOD = (e) => {
    e.preventDefault();
    createCashOrder(user.token, couponApplied).then((res) => {
      if (res.data.ok) {
        toast.success("Your Order is Placed!!")
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

        setTimeout(() => {                   //////redirect
          navigate("/user/history");
        }, 1000)
      }
    });


  }

  return (
    <div className="container-fluid   pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-center p-3 mt-4 mb-4 display-7 jumbotron bg-info">
            Delivery Address
          </h4>

          {showAddress()}
          <hr className="bg-info border-2 border-top border-secondary" />

          <h5 className="text-center p-3 mt-4 mb-4 display-8 jumbotron bg-info">
            Got Coupon?
          </h5>
          {showApplyCoupon()}
          <br />
          {discountErr && <p className="text-danger"> {discountErr} </p>}
        </div>

        <div className="col-md-6">
          <h4 className="text-center p-3 mt-4 mb-4 display-7 jumbotron bg-info">
            Order Summery
          </h4>
          <h4>
            <b> {products.length} Products in the Cart: </b>
          </h4>

          {showOrderSummery()}

          <hr className="bg-info border-2 border-top border-secondary" />
          <h4>
            Cart Total: <b> ${total}</b>
          </h4>
          <br />

          {totalAfterDiscount > 0 && (
            <>
              <p className="text-success"> "{coupon}" Coupon Applied!! </p>
              <h4 className="text-success">
                <b>Total Payable: ${totalAfterDiscount} </b>
              </h4>
            </>
          )}

          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-outline-info btn-block mt-3"
                disabled={!products.length || !addressSaved}
                onClick={() => navigate("/payment") }
              >
                Place Order With Online  Payment
              </button>

              <button
                className="btn btn-outline-info btn-block mt-3"
                disabled={!products.length || !addressSaved}
                onClick={handleCOD}
              >
                Place Order With Cash On Delivery
              </button>
            </div>

            <div className="col-md-6">
              <button
                className="btn btn-info btn-block mt-3"
                disabled={!products.length}
                onClick={handleEmptyCart}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
