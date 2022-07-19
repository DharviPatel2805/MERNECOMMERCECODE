import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/Adminnav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listCategories } from "../../../functions/category";
import { updateSub, readSub } from "../../../functions/sub";

import { useNavigate, useParams } from "react-router-dom";

function SubUpdate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    listCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    readSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is Updated`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  const createSubCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
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
                <b>Sub Category Update</b>
              </h2>
              <hr className="bg-info border-2 border-top border-info " />
            </>
          )}

          <div className="form-group  mt-3">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control  p-1"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Select Category</option>
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === parent}
                    >
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>

          {createSubCategoryForm()}
        </div>
        </div>
      </div>
    </div>
  );
}

export default SubUpdate;
