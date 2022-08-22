import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCartTable from "../components/cards/ProductCartTable";
import { userCart } from "../functions/user";

const Cart = () => {
  // let dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((cv, nv) => {
      return cv + nv.count * nv.price;
    }, 0);
  };

  const saveToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart data", res.data);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log(err));
  };

  const showCartItems = () => (
    <table className="table table-bordered ">
      <thead className="table-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCartTable key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid  pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-8">
          <h4 className="p-3 mt-3 mb-3 text-white text-center display-5 jumbotron bgColor">
            Cart/{cart.length} Product
          </h4>

          {!cart.length ? (
            <h4>
              No Product in the cart.{" "}
              <Link to="/shop" className="text-warning">
                Continue Shopping!!
              </Link>
            </h4>
          ) : (
            showCartItems()
          )}
        </div>

        <div className="col-md-4 ">
          <h4 className="p-3 mt-3 mb-3 text-white text-center display-5 jumbotron bgColor">
            Order Summery
          </h4>
          <hr className="bg-info border-2 border-top border-info" />
          <h4>
            <b>Products</b>
          </h4>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr className="bg-info border-2 border-top border-info " />
          total: <b> ${getTotal()}</b>
          <hr className="bg-info border-2 border-top border-info " />
          <br/>
          {user ? (
            <button
              className="btn btn-info"
              disabled={!cart.length}
              onClick={saveToDb}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-info">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "/cart" },
                }}
              >
                Login To Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
