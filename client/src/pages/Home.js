import React, { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/subs/SubList";
import { readContent } from "../functions/content";

function Home() {
  const [content, setContent] = useState([
    "Latest Products",
    "New Arrivals",
    "Best Sellers",
  ]);

  useEffect(() => {
    readContent().then((res) => {
      res.data.map((res) => {
        if (res.set) {
          setContent(res.title);
        }
      });
    });
  }, []);

  return (
    <div className="pl-0 pt-4 mt-5 relative" >
      <div className="jumbotron text-warning h1 text-center bgColor ">
        <Jumbotron text={content} />
      </div>

      <div className="row">
        <div className="col m-3">
          <h2 className=" text-left m-2 ">
            <b className="h1" >New Arrivals</b>
          </h2>
          <hr className="bg-info border-2 border-top border-info " />
        </div>
      </div>
      <NewArrivals />

      <div className="row">
        <div className="col m-4">
          <h2 className=" text-left m-2 ">
            <b className="h1">Best Sellers</b>
          </h2>
          <hr className="bg-info border-2 border-top border-info " />
        </div>
      </div>
      <BestSellers />

      <h4 className="text-center text-white p-3 mt-5 mb-5 display-5 jumbotron bgColor">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center text-white p-3 mt-5 mb-5 display-5 jumbotron bgColor">
        Sub Categories
      </h4>
      <SubList />

      <br />
      <br />
    </div>
  );
}

export default Home;
