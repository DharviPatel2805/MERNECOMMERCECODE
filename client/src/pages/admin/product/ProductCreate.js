import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "../../../functions/product";
import { listCategories, getCategorySubs } from "../../../functions/category";

import AdminNav from "../../../components/nav/Adminnav";
import FileUpload from "../../../components/forms/FileUpload";

import { LoadingOutlined } from "@ant-design/icons";
import { Select } from "antd";
const { Option } = Select;

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  quantity: "",
  images: [],
  shipping: "",
  colors: ["Black", "Silver", "White", "Space Gray", "Blue"],
  brands: [
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
  ],
  color: "",
  brand: "",
};

function ProductCreate() {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const loadCategories = () =>
    listCategories().then((c) => setValues({ ...values, categories: c.data }));

  //destructure
  const {
    title,
    description,
    price,
    categories,
    //category,
    subs,
    quantity,
    //images,
    //shipping,
    colors,
    brands,
    //color,
    //brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        //console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    //console.log("category clicked", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });

    getCategorySubs(e.target.value).then((res) => {
      //console.log("sub options on category click", res);
      setSubOptions(res.data);
      setShowSub(true);
    });
  };

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>
        <div className="col-md-10">
        <div className="m-2 md:m-10 mt-5 p-5 md:p-10 bg-light rounded-3xl">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <>
              <h2 className=" text-left m-4 h2">
                <b>Product Create</b>
              </h2>
              <hr className="bg-info border-2 border-top border-info " />
            </>
          )}
          {/* {JSON.stringify(values)} */}
          {/* {JSON.stringify(categories)} */}
          <br />

          {/* {JSON.stringify(values.images)} */}
          <br/>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
            <br />

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={handleChange}
                  value={title}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  onChange={handleChange}
                  value={description}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  onChange={handleChange}
                  value={price}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Shipping</label>
                <select
                  name="shipping"
                  className="form-control p-1"
                  onChange={handleChange}
                >
                  <option>Please Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                <br />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control  p-1"
                  onChange={handleChange}
                  value={quantity}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Color</label>
                <select
                  name="color"
                  className="form-control  p-1"
                  onChange={handleChange}
                >
                  <option>Please Select</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <br />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <select
                  name="brand"
                  className="form-control  p-1"
                  onChange={handleChange}
                >
                  <option>Please Select</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <br />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control  p-1"
                  onChange={handleCategoryChange}
                >
                  <option>Select Category</option>
                  {categories.length > 0 &&
                    categories.map((c) => {
                      return (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              {showSub && (
                <div>
                  <label>Sub Category</label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={subs}
                    onChange={(value) => setValues({ ...values, subs: value })}
                  >
                    {subOptions.length > 0 &&
                      subOptions.map((s) => {
                        return (
                          <Option key={s._id} value={s._id}>
                            {s.name}
                          </Option>
                        );
                      })}
                  </Select>
                </div>
              )}
              <br />
              <button className="btn btn-info mb-2">Save Product</button>
              <br />
            </form>
          
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
