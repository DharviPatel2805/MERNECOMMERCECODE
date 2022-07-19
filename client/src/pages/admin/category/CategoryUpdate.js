import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { readCategory, updateCategory } from "../../../functions/category";
import AdminNav from "../../../components/nav/Adminnav";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    readCategory(slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(slug, { name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is Updated`);
        navigate("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  const categoryForm = () => (
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
                <b>Category Update</b>
              </h2>
              <hr className="bg-info border-2 border-top border-info " />
            </>
          )}
          {categoryForm()}

          <br />
          <hr />
        </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;
