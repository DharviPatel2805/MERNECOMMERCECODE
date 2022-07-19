import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCategory,
  listCategories,
  removeCategory,
} from "../../../functions/category";

import AdminNav from "../../../components/nav/Adminnav";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function CreateCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    listCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  const handleRemove = async (slug) => {
    // let ans = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error("Deleted!!");
          loadCategories();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.message);
        });
    }
  };

  //step 2 for filter

  const handleSerchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  //step 3
  const serched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const createCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="category name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-info">Save</button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid pl-0  pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>
        <div className="col">
          <div className="m-2 md:m-10 mt-5 p-5 md:p-10 bg-light rounded-3xl">
            {loading ? (
              <h3> Loading... </h3>
            ) : (
              <>
                <h2 className=" text-left m-4 h2">
                  <b>Category Create</b>
                </h2>
                <hr className="bg-info border-2 border-top border-info " />
              </>
            )}
            
            {createCategoryForm()}

            <br />

            {/* step 1 for filter  */}
            <input
              value={keyword}
              type="search"
              placeholder="Filter"
              onChange={handleSerchChange}
              className="form-control mb-2 "
            />

            <hr />

            {/* { JSON.stringify(categories) }     */}

            {/* step 4 for filter */}

            {categories.filter(serched(keyword)).map((c) => {
              return (
                <div className="alert alert-secondary" key={c._id}>
                  {c.name}
                  <span
                    className="btn btn-sm float-right"
                    onClick={() => handleRemove(c.slug)}
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/category/${c.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-success" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
