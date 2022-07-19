import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/Adminnav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listCategories } from "../../../functions/category";
import { listSubs, createSub, removeSub } from "../../../functions/sub";

import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function SubCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    listCategories().then((c) => setCategories(c.data));

  const loadSubs = () => listSubs().then((c) => setSubs(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createSub({ name, parent: category }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`"${res.data.name}" is deleted!!`);
          loadSubs();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.message);
        });
    }
  };

  const handleSerchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const serched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);

  const createSubCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Sub Category Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <button className="btn btn-info mt-3">Save</button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
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
                <b>Sub Category Create</b>
              </h2>
              <hr className="bg-info border-2 border-top border-info " />
            </>
          )}

          <div className="form-group mt-3">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control p-1"
              onChange={(e) => setCategory(e.target.value)}
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

          {createSubCategoryForm()}

          
          <hr className="bg-info border-2 border-top border-info " />


          <div className="form-group mt-3">
          <label>Search By Filter</label>
          <input
            value={keyword}
            type="search"
            placeholder="Filter"
            onChange={handleSerchChange}
            className="form-control"
          />
          </div>


          <br />

          {subs.filter(serched(keyword)).map((s) => {
            return (
              <div className="alert alert-secondary" key={s._id}>
                {s.name}
                <span
                  className="btn btn-sm float-right"
                  onClick={() => handleRemove(s.slug)}
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
