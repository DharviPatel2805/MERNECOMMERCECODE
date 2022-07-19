import React, { useState, useEffect } from "react";
import AllProductCard from "../cards/AllProductCard";
import LoadingCard from "../cards/LoadingCard";

import { getProducts, getProductsCount } from "../../functions/product";
import { Pagination } from "antd";

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
    <div className="container">
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 pb-3">
              <AllProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="row">
      <nav className="col-md-4 offset-md-4 text-center pt-4 ">
        <Pagination
          defaultCurrent={page}
          total={(productsCount / 3) * 10}
          onChange={(value) => setPage(value)}
        />
      </nav>
    </div>
  </>
  );
}

export default BestSellers;
