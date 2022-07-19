import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCategory } from "../../functions/category";
import AllProductCard from "../../components/cards/AllProductCard";

function CategoryHome() {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    readCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      //   console.log(JSON.stringify(res.data));
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container-fluid   pt-4 mt-5 relative">
      <div className="row">
        <div className="col">
          {loading ? (
            <h2 className="p-3 mt-4 mb-3 text-white text-center display-5 jumbotron bgColor ">
              Loading...
            </h2>
          ) : (
            <h2 className="p-3 mt-4 mb-3 text-white text-center display-5 jumbotron bgColor">
              {products.length} products in "{category.name}" category
            </h2>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <AllProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryHome;
