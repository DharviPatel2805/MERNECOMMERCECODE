import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../../functions/product";
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
  category: "",
  subs: [],
  quantity: "",
  images: [],
  shipping: "",
  colors: ["Black", "Silver", "White", "Space Gray", "Blue"],
  brands: ["Apple", "HP", "Lenovo", "ASUS", "SONY"],
  color: "",
  brand: "",
};

function ProductUpdate() {
  const { slug } = useParams();
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubsId, setArrayOfSubsId] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () =>
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => arr.push(s._id));
      setArrayOfSubsId((prev) => arr);
    });

  const loadCategories = () =>
    listCategories().then((c) => setCategories(c.data));

  //destructure
  const {
    title,
    description,
    price,
    category,
    //subs,
    quantity,
    //images,
    shipping,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    values.subs = arrayOfSubsId;
    updateProduct(slug, values, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      //console.log("sub options on category click", res);
      setSubOptions(res.data);
    });

    if (values.category._id === e.target.value) {
      loadProduct();
    }

    setArrayOfSubsId([]);
  };

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>
        <div className="col">
          <div className="m-2 md:m-10 mt-5 p-5 md:p-10 bg-light rounded-3xl">
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <>
                <h2 className=" text-left m-4 h2">
                  <b>Product Update</b>
                </h2>
                <hr className="bg-info border-2 border-top border-info " />
              </>
            )}
            {/* {JSON.stringify(values)} */}
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
                  value={shipping === "Yes" ? "Yes" : "No"}
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
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
                  className="form-control"
                  onChange={handleChange}
                  value={quantity}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Color</label>
                <select
                  name="color"
                  value={color}
                  className="form-control"
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
                  value={brand}
                  className="form-control"
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
                  className="form-control"
                  onChange={handleCategoryChange}
                  value={category._id}
                >
                  {/* <option>{category ? category.name : "Select Category"} </option> */}
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

              <div>
                <label>Sub Category</label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  value={arrayOfSubsId}
                  onChange={(value) => setArrayOfSubsId(value)}
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

              <br />
              <button className="btn btn-outline-info mb-2">Save</button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
