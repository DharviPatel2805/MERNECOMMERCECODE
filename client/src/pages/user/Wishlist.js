import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeFromWishlist } from "../../functions/user";
import { Card, Tooltip } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(JSON.stringify(res.data.wishlist, null, 4));
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeFromWishlist(productId, user.token).then((res) => {
      toast.warning("Item removed from Wishlist");
      loadWishlist();
    });

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <h4 className="text-center text-white p-3 mt-4 mb-4 display-6 jumbotron bgColor" >
            Wishlist
          </h4>

          {/* {wishlist && wishlist.map(pro => (
            <div key={pro._id} className="alert alert-secondary ">
              <Link to={`/product/${pro.slug}`} > {pro.title} </Link>
              <span
                onClick={() => handleRemove(pro._id)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined />
              </span>
            </div>
          ))} */}

          <div className="row" >
            {wishlist.map((p, i) => (
              <div className="col-md-3 mb-5" key={i} >
                <Card
                  cover={
                    <img
                      alt=""
                      src={
                        p.images && p.images.length ? p.images[0].url : laptop
                      }
                      style={{ height: "150px", objectFit: "cover" }}
                      className="p-2"
                    />
                  }
                  actions={[
                    <Link to={`/product/${p.slug}`}>
                      <EyeOutlined className="text-success" />
                      <br />
                      View Product
                    </Link>,

                    <Link to="/user/wishlist" onClick={() => handleRemove(p._id) } >
                      <DeleteOutlined className="text-danger" />
                      <br />
                      Remove from Wishlist
                    </Link>,
                  ]}
                >
                  <Meta
                    title={`${p.title} - $${p.price}`}
                  />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
