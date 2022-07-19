import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import { Drawer } from "antd";


const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      placement="right"
      visible={drawer}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
    >
      {cart.map((p) => (
        <div key={p._id} >
          <div>
            {p.images[0] ? (
              <img
                src={p.images[0].url}
                style={{ width: "auto", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <img
                src={laptop}
                style={{ width: "auto", height: "100px", objectFit: "cover" }}
              />
            )}
            <p className="text-center bg-secondary text-light">
              {p.title} x {p.count}
            </p>
          </div>
        </div>
      ))}

      <Link to="/cart">
        <button
          className="btn text-center btn-info btn-block btn-raised "
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
