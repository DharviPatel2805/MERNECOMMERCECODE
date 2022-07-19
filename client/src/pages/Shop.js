import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProductByCount, fetchProductsByFilter } from "../functions/product";
import { listCategories } from "../functions/category";
import { listSubs } from "../functions/sub";
import AllProductCard from "../components/cards/AllProductCard";

import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

import Star from "../components/forms/Star";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const [star, setStar] = useState("");

  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");

  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "HP",
    "Lenovo",
    "ASUS",
    "SONY",
    "Toshiba",
    "Acer",
    "Microsoft",
    "Chromebook",
    "Samsung",
    "MSI",
    "Razer",
    "Motorola",
    "Google",
  ]);

  const [color, setColor] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Silver",
    "White",
    "Space Gray",
    "Blue",
  ]);

  const [shipping, setShipping] = useState("");

  const dispatch = useDispatch();

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    //fetch all categories
    listCategories().then((res) => setCategories(res.data));
    //fetch all subs
    listSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  //1. load products by default////////
  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  //2. load products on user search
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if(!text){
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //3. load products based on price/////
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    //reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4. load product based on categories
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          className="p-3"
          name="category"
          value={c._id}
          onChange={handleCheck}
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  //handle check for category
  const handleCheck = (e) => {
    // console.log(e.target.value);

    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); //if index found it return index,,if not found that means it's not already checked add it in the array

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1); //if found then pull out one item from state array
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  //5. load product based on star ratings
  const handleStarClick = (num) => {
    // console.log(num);
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setStar(num);

    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="p-3">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  //6. load product based on sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-2 m-1 badge bg-info text-dark"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (s) => {
    setSub(s);

    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");

    fetchProducts({ sub: s });
  };

  //7. load product based on brand
  const showBrands = () =>
    brands.map((b) => (
      <div key={b} className="p-3">
        <Radio value={b} name={b} onChange={handleBrand} checked={b === brand}>
          {b}
        </Radio>
      </div>
    ));

  const handleBrand = (e) => {
    ///reset
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setShipping("");

    setBrand(e.target.value);

    fetchProducts({ brand: e.target.value });
  };

  //8. load product based on color
  const showColors = () =>
    colors.map((c) => (
      <div key={c} className="p-3">
        <Radio value={c} name={c} onChange={handleColor} checked={c === color}>
          {c}
        </Radio>
      </div>
    ));

  const handleColor = (e) => {
    ///reset
    setSub("");
    setBrand("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setShipping("");

    setColor(e.target.value);

    fetchProducts({ color: e.target.value });
  };

  //9/ load product based on shipping
  const showShipping = () => (
    <div>
      <Checkbox
        className="p-3"
        value="Yes"
        onChange={handleShipping}
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="p-3"
        value="No"
        onChange={handleShipping}
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </div>
  );

  const handleShipping = (e) => {
    ///reset
    setSub("");
    setBrand("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");

    setShipping(e.target.value);

    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid  mt-5 relative">
      <div className="row">
        <div className="col-md-3">
          <h4 className=" text-center text-white p-3 mt-5 mb-5 display-5 jumbotron bgColor">
            Search/Filter
          </h4>
          <hr />

          <Menu defaultOpenKeys={["1", "2", "3", "4", "7", "8"]} mode="inline">
            {/* price */}
            <Menu.SubMenu
              key="1"
              title={
                <span className="h5">
                  <DollarOutlined className="mr-4" /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="9999"
                />
              </div>
            </Menu.SubMenu>

            {/* category */}
            <Menu.SubMenu
              key="2"
              title={
                <span className="h5">
                  <DownSquareOutlined className="mr-4" /> Categories
                </span>
              }
            >
              <div>{showCategories()}</div>
            </Menu.SubMenu>

            {/* ratings */}
            <Menu.SubMenu
              key="3"
              title={
                <span className="h5">
                  <StarOutlined className="mr-4" /> Rating
                </span>
              }
            >
              <div>{showStars()}</div>
            </Menu.SubMenu>

            {/* sub categories */}
            <Menu.SubMenu
              key="4"
              title={
                <span className="h5">
                  <DownSquareOutlined className="mr-4" /> Sub Categories
                </span>
              }
            >
              <div className="p-3">{showSubs()}</div>
            </Menu.SubMenu>

            {/* brand */}
            <Menu.SubMenu
              key="5"
              title={
                <span className="h5">
                  <DownSquareOutlined className="mr-4" /> Brand
                </span>
              }
            >
              <div className="pr-5 pl-5">{showBrands()}</div>
            </Menu.SubMenu>

            {/* color */}
            <Menu.SubMenu
              key="7"
              title={
                <span className="h5">
                  <DownSquareOutlined className="mr-4" /> Color
                </span>
              }
            >
              <div className="pr-5 pl-5">{showColors()}</div>
            </Menu.SubMenu>

            {/* shipping */}
            <Menu.SubMenu
              key="8"
              title={
                <span className="h5">
                  <DownSquareOutlined className="mr-4" /> Shipping
                </span>
              }
            >
              <div className="pr-5 pl-5">{showShipping()}</div>
            </Menu.SubMenu>
          </Menu>
        </div>

        <div className="col-md-9">
          {loading ? (
            <h2 className="text-danger ">Loading...</h2>
          ) : (
            <h2 className=" text-center text-white p-3 mt-5 mb-5 display-5 jumbotron bgColor">
              Products
            </h2>
          )}

          {products.length < 1 && <h4>No Products Found</h4>}

          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mb-4">
                <AllProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
