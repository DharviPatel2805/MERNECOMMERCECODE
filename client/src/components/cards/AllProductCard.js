import React, { useState } from "react";
import { useDispatch } from "react-redux";
import laptop from "../../images/laptop.jpg";
import { showAverage } from "../../functions/ratings";

import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
const { Meta } = Card;

function AllProductCard({ product }) {
  const [tooltip, setTooltip] = useState("Click To Add");
  const { title, description, images, slug, price } = product;

  let dispatch = useDispatch();
  // const { user, cart } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    //create cart array
    let cart = [];

    if (typeof window !== "undefined") {
      //if cart in localstorage get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));

      setTooltip("Added");

      //add to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      //show item in cart drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pb-3 ">"No Ratings Yet!"</div>
      )}
      <Card
        hoverable
        cover={
          <img
            alt=""
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-2"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-success" />
            <br />
            View Product
          </Link>,

          <Tooltip title={product.quantity > 1 && tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1} href="" >
              <ShoppingCartOutlined className="text-danger" />
              <br />
              {product.quantity < 1 ? "Out Of Stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 30)}...`}
        />
      </Card>
    </>
  );
}

export default AllProductCard;
