import React from "react";
import { Link } from "react-router-dom";

function SingleProductInfo({ product }) {
  const {
    category,
    subs,
    price,
    shipping,
    brand,
    color,
    sold,
    quantity,
  } = product;

  return (
    <>
      <ul className="list-group">
        <li className="list-group-item ">
          Price
          <span className="float-sm-right">${price}</span>
        </li>

        {category && (
          <li className="list-group-item ">
            <span>Category</span>

            <Link to={`/category/${category.slug}`} className="float-sm-right">
              {category.name}
            </Link>
          </li>
        )}

        {subs && (
          <li className="list-group-item ">
            Sub Category
            {subs.map((s) => (
              <Link
                key={s._id}
                to={`/sub/${s.slug}`}
                className="float-sm-right"
              >
                {s.name} ||
              </Link>
            ))}
          </li>
        )}

        <li className="list-group-item">
          Shipping
          <span className="float-sm-right">{shipping}</span>
        </li>

        <li className="list-group-item ">
          Color
          <span className="float-sm-right ">{color}</span>
        </li>

        <li className="list-group-item">
          Brand
          <span className=" float-sm-right">{brand}</span>
        </li>

        <li className="list-group-item">
          Available
          <span className="float-sm-right">{quantity}</span>
        </li>

        <li className="list-group-item">
          Sold
          <span className="float-sm-right">{sold}</span>
        </li>
      </ul>
    </>
  );
}

export default SingleProductInfo;
