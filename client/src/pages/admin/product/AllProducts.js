import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/Adminnav";
import { getProductByCount, removeProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
    if(window.confirm("Delete?")){
        removeProduct(slug, user.token).then((res) => {
            loadAllProducts();
            toast.error(`"${res.data.title}" is deletd!`);
        } ).catch((err) => {
            if(err.response.status === 400) toast.error(err.response.data);
            console.log(err);
        } )
    }
  }

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4 className="p-3 mt-4 mb-3  text-center display-5 jumbotron bg-light ">
              All Products
            </h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 pb-3"  key={product._id} >
                <AdminProductCard product={product} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
