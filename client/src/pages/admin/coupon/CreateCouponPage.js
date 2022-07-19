import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from "../../../functions/coupon";
import AdminNav from "../../../components/nav/Adminnav";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DeleteOutlined } from "@ant-design/icons";

function CreateCouponPage() {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupon] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons().then((res) => setCoupon(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table(name, expiry, discount);
    setLoading(true);

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        getCoupons().then((res) => setCoupon(res.data));
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} Successfully created!`);
      })
      .catch((err) => console.log("create coupon error", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Deleted?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          getCoupons().then((res) => setCoupon(res.data));
          setLoading(false);
          toast.error(`${res.data.name} Successfully deleted!`);
        })
        .catch((err) => console.log("create coupon error", err));
    }
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
            <h3 className="text-danger">Loading...</h3>
          ) : (
            <>
              <h2 className=" text-left m-4 h2">
                <b>Coupons</b>
              </h2>
              <hr className="bg-info border-2 border-top border-info " />
            </>
          )}
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group  mt-3">
              <label>Coupon Code</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label>Discount %</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label>Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                value={expiry}
                required
              />
            </div>

            <button className="btn btn-info">Save</button>
          </form>

          <br />
          <br />
          <h4> {coupons.length} Coupon </h4>
          <hr />

          <table className="table table-bordered ">
            <thead className="table-light">
              <tr>
                <th scope="col">Coupon Code</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      className="text-danger pointer text-center"
                      onClick={() => handleRemove(c._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCouponPage;
