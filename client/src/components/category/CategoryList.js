import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listCategories } from "../../functions/category";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    listCategories().then((res) => {
      // console.log(res.data);
      setCategories(res.data);
      setLoading(false);
    });
  }, []);


  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          categories.map((c) => (
            <div key={c._id} className="col btn btn-light  btn-raised m-3">
              <Link to={`/category/${c.slug}`} className="font-weight-bold text-uppercase text-dark">
                {c.name}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryList;
