import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserCart,
  emptyCart,
  saveUserAddress,
  applyCoupon,
  getUserCredit,
  applyCredit,
  updateCredit,
  createCashOrder,
} from "../functions/user";

import { toast } from "react-toastify";
import { UpCircleFilled, DownCircleFilled } from "@ant-design/icons";
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

  const [openVW, setOpenVW] = useState(false);
  const [userCreditPoint, setUserCreditPoint] = useState(0); //got credit point value from backend
  const [appliedCredit, setAppliedCredit] = useState(false);
  const [inputCredit, setInputCredit] = useState(0); // applied credit point in purchase
  const [leftCredit, setLeftCredit] = useState(0); // left credit aafter purchase of product
  const [totalAfterCredit, setTotalAfterCredit] = useState(0); // total amount after applied credit point

  const [placeOrder, setPlaceOrder] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, credit } = useSelector((state) => ({ ...state }));
  const { couponApplied } = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("get user cart", res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });

    getUserCredit(user.token).then((res) => {
      console.log("user point", res.data);
      setUserCreditPoint(res.data);
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

  const applyCreditPoint = () => {
    applyCredit(inputCredit, user.token).then((res) => {
      console.log("applied credit point", res.data);

      if (res.data) {
        setTotalAfterCredit(res.data);
        setAppliedCredit(true);
        dispatch({
          type: "CREDIT_POINT_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        //update redux coupoon
        dispatch({
          type: "CREDIT_POINT_APPLIED",
          payload: false,
        });
      }

      const leftcreditpoints = userCreditPoint - inputCredit;
      setLeftCredit(leftcreditpoints);
    });
  };

  const handleCreditChange = (e) => {
    const creditpoint = e.target.value;
    if (creditpoint > userCreditPoint) {
      toast.error(
        `you have ${userCreditPoint} credit points. Enter valid value.`
      );
      return;
    }

    setInputCredit(creditpoint);
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
      {!appliedCredit ? (
        <>
          <input
            value={coupon}
            type="text"
            className="form-control"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <br />
          <button className="btn btn-info" onClick={applyDiscountCoupon}>
            Apply Couopn
          </button>
        </>
      ) : (
        <p>You can either use coupon or virtual Wallet.</p>
      )}
    </>
  );

  const showApplyCredit = () => (
    <>
      <h4>
        <b>Total credit points: {userCreditPoint} </b>
      </h4>
      <button className="btn btn-outline-info mt-3">
        Use Virtual Wallet
        {!openVW ? (
          <DownCircleFilled className="ml-5" onClick={(e) => setOpenVW(true)} />
        ) : (
          <UpCircleFilled className="ml-5" onClick={(e) => setOpenVW(false)} />
        )}
      </button>

      {openVW && (
        <div className="p-3  bg-light">
          <p>You can use it if you have total purchse of more than $444.</p>
          <h1>
            If your total amount after discount will be more than $555 then 1
            credit point will be added to your account.
          </h1>
          {userCreditPoint > 0 &&
            total > 444 &&
            !couponApplied &&
            totalAfterDiscount == 0 && (
              <>
                <input
                  value={inputCredit}
                  type="text"
                  className="form-control"
                  onChange={handleCreditChange}
                />
                <br />
                <button className="btn btn-info" onClick={applyCreditPoint}>
                  Use Credit Points
                </button>
              </>
            )}
        </div>
      )}
    </>
  );

  const handlePlaceOrder = () => {
    setPlaceOrder(true);
    updateCredit(leftCredit, appliedCredit, user.token).then((res) => {
      toast.success("Your order is confirmed. Please select payment method.");
    });
  };

  const handleCOD = (e) => {
    e.preventDefault();
    createCashOrder(user.token, couponApplied, credit).then((res) => {
      if (res.data.ok) {
        toast.success("Your Order is Placed!!");
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

        setTimeout(() => {
          //////redirect
          navigate("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="container-fluid   pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-center p-3 mt-4 mb-4 display-7 jumbotron bg-info">
            Delivery Address
          </h4>
          {showAddress()}
          <br />

          <h5 className="text-center p-3 mt-4 mb-4 display-8 jumbotron bg-info">
            Got Coupon?
          </h5>
          {showApplyCoupon()}
          <br />

          {discountErr && <p className="text-danger"> {discountErr} </p>}

          <h5 className="text-center p-3 mt-4 mb-4 display-8 jumbotron bg-info">
            Virtual Wallet
          </h5>
          {showApplyCredit()}
          <br />
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
          <br />
          <h4>
            <b> Cart Total: ${total}</b>
            <br />
            {totalAfterCredit > 0 && <b> Discount : -${inputCredit * 11}</b>}
          </h4>

          {totalAfterDiscount > 0 && (
            <>
              <h4 className="text-success">
                <b>Total Payable: ${totalAfterDiscount} </b>
              </h4>
              {!appliedCredit && (
                <p className="text-success"> "{coupon}" Coupon Applied!! </p>
              )}
            </>
          )}

          {totalAfterCredit > 0 && (
            <>
              <h4 className="text-success">
                <b>Total Payable: ${totalAfterCredit} </b>
              </h4>
              {appliedCredit && (
                <p className="text-success">
                  "{inputCredit}" Credit Point Applied from Virtual Wallet!
                </p>
              )}
            </>
          )}

          <div className="row">
            <div className="col-md-6">
              {!placeOrder && (
                <button
                  className="btn btn-outline-info btn-block mt-3"
                  disabled={!products.length || !addressSaved}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              )}

              {placeOrder && (
                <>
                  <button
                    className="btn btn-outline-info btn-block mt-3"
                    disabled={!products.length || !addressSaved}
                    onClick={() => navigate("/payment")}
                  >
                    Place Order With Online Payment
                  </button>

                  <button
                    className="btn btn-outline-info btn-block mt-3"
                    disabled={!products.length || !addressSaved}
                    onClick={handleCOD}
                  >
                    Place Order With Cash On Delivery
                  </button>
                </>
              )}
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
