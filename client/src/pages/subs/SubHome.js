import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readSub } from "../../functions/sub";
import AllProductCard from "../../components/cards/AllProductCard";

function SubHome() {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();
  
  useEffect(() => {
    readSub(slug).then((res) => {
      setSub(res.data.sub);
      setProducts(res.data.products);
      //   console.log(JSON.stringify(res.data));
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container-fluid  pt-4 mt-5 relative">
      <div className="row">
        <div className="col">
          {loading ? (
            <h2 className="p-3 mt-4 mb-3 text-white text-center display-5 jumbotron bgColor ">
              Loading...
            </h2>
          ) : (
            <h2 className="p-3 mt-4 mb-3 text-white text-center display-5 jumbotron bgColor ">
              {products.length} products in "{sub.name}" sub category
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

export default SubHome;
