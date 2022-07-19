import React , { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleProductInfo from "./SingleProductInfo";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs, Tooltip } from "antd";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/ratings";
import _ from "lodash";
import { addToWishlist } from "../../functions/user";

const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, star }) {
  const { title, description, images, _id } = product;

  const [tooltip, setTooltip] = useState("Click To Add");
  
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(_id, user.token).then((res) => {
      console.log("added to wishlist", res.data);
      toast.success("Item Added to Wishlist");
      navigate("/user/wishlist");
    } )

  }

  return (
    <>
      <div className="col-md-7 p-4">
        {images && images.length ? (
          <Carousel autoPlay infiniteLoop showArrows>
            {images && images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
          </Carousel>
        ) : (
          <Carousel autoPlay infiniteLoop showArrows>
            <img src={laptop}  alt=""  />
          </Carousel>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1" className="mb-3">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on XXXXX XXXXX to learn more about it.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3 h1"> {title} </h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pb-3 ">"No Ratings Yet!"</div>
        )}

        <Card
          actions={[
            <a onClick={handleAddToWishlist} >
              <HeartOutlined className="text-success" />
              <br />
              { user && <p> Add to Wishlist</p> }
              { !user && <p>Login for Add to Wishlist</p> }
            </a>,

            <Tooltip title={product.quantity > 1 && tooltip }>
              <a onClick={handleAddToCart}  disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out Of Stock" : "Add to Cart"}
              </a>
            </Tooltip>,

            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                starRatedColor="red"
                changeRating={onStarClick}
                isSelectable={true}
              />
            </RatingModal>,
          ]}
        >
          <SingleProductInfo product={product} />
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
