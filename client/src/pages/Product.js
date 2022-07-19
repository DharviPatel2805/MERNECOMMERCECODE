import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  productStar,
  getProduct,
  getRelatedProduct,
} from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import AllProductCard from "../components/cards/AllProductCard";

function Product() {
  const [product, setProduct] = useState([]);
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product.ratings, user]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      console.log(res.data);
      getRelatedProduct(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct();
    });
  };

  return (
    <div className="container-fluid   pt-4 mt-5 relative">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <h3 className="col text-center pt-5 pb-5 h3">
          <hr class="bg-info border-2 border-top border-info " />
          Related Products
          <hr class="bg-info border-2 border-top border-info" />
        </h3>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <AllProductCard product={r} />
            </div>
          ))
        ) : (
          <h3 className="col text-center">No Products Found!</h3>
        )}
      </div>
    </div>
  );
}

export default Product;
